import React, { useState, useEffect } from "react";
import { getLongestJourney } from "../../util/apiCaller";
import Error from "../../util/Error";
import PulseLoader from "react-spinners/PulseLoader";
import Bikes from '../../media/bikes.jpg'
import './Home.css';

const Home = ({ api }) => {
    //home page component
    const [ longestJourney, setLongestJourney ] = useState();
    const [ hasError, setHasError ] = useState(false);

    useEffect(() => {
        const getLongestJourneyOnRender = async () => {
            try {
                const data = await getLongestJourney(api);
                const longestJourneyInKM = (data.items[0].distance_m / 1000).toFixed(2);
                setLongestJourney(longestJourneyInKM);
            } catch (err) {
                setHasError(true);
                throw new Error(err);
            }
        }
        getLongestJourneyOnRender();
    }, [])

    return (
        <div className="home">
            <h2>HEL City Bikes <span className="bike">🚲</span></h2>
                <img src={Bikes} />
                <figcaption>Image used under Creative Commons license. Data is owned by City Bike Finland and HSL.</figcaption>
                <p>Moi! Welcome to HEL City Bikes app. Here you can search Helsinki and Espoo's rental bike stations and view all journeys taken in the summer of 2021.</p>
                {!hasError ? 
                    longestJourney ?
                        <p>The longest journey was {longestJourney} km!</p>:
                        <PulseLoader color="#646cff" cssOverride={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1.35rem'
                        }}/> :
                    <Error />
                }
            </div>
    )
}

export default Home;