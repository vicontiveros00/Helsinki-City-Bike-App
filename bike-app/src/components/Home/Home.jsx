import React, { useState } from "react";
import apiCaller from "../../util/apiCaller";
import PulseLoader from "react-spinners/PulseLoader";
import Bikes from '../../media/bikes.jpg'
import './Home.css';

function Home(props) {
    //home page component
    const [ longestJourney, setLongestJourny ] = useState();

    apiCaller.getLongestJourney(props.api).then((journey) => {
        setLongestJourny(journey);
    }).catch(() => {
        setLongestJourny(undefined);
    }) //get longest journey and update state

    return (
        <div className="home">
            <h2>HEL City Bikes <span className="bike">🚲</span></h2>
                <img src={Bikes} />
                <figcaption>Image used under Creative Commons license. Data is owned by City Bike Finland and HSL.</figcaption>
                <p>Moi! Welcome to HEL City Bikes app. Here you can search Helsinki and Espoo's rental bike stations and view all journeys taken in the summer of 2021.</p>
                {longestJourney ? <p>The longest journey was {(longestJourney / 1000).toFixed(2)} km!</p> : 
                    <PulseLoader color="#646cff" cssOverride={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '1.35rem'
                    }}/>
                    //if longest journey hasn't loaded in yet, display loader
                }
                <p>Coded with love by <a href="https://github.com/vicontiveros00">github/vicontiveros00</a>.</p>
                {/*check out my other projects!*/}
            </div>
    )
}

export default Home;