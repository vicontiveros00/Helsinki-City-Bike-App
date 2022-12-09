import React, { useState } from "react";
import apiCaller from "../../util/apiCaller";
import PulseLoader from "react-spinners/PulseLoader";
import './Home.css';

function Home(props) {
    const [ longestJourney, setLongestJourny ] = useState();

    apiCaller.getLongestJourney(props.api).then((journey) => {
        setLongestJourny(journey);
    });

    return (
        <div className="home">
            <h2>HEL City Bikes <span className="bike">🚲</span></h2>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Helsinki_city_bikes_station_2016_kauppatori.jpg/800px-Helsinki_city_bikes_station_2016_kauppatori.jpg?20160930172854" />
                <figcaption>Image used under Creative Commons license. Data is owned by City Bike Finland and HSL City Bike Stations.</figcaption>
                <p>Moi! Welcome to HEL City Bikes app. Here you can search Helsinki and Espoo's rental bike stations and view all journeys taken in the summer of 2021.</p>
                {longestJourney ? <p>The longest journey was {(longestJourney / 1000).toFixed(2)} km!</p> : 
                    <PulseLoader color="#646cff" cssOverride={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '1.35rem'
                    }}/>
                }
                <p>Coded with love by <a href="https://github.com/vicontiveros00">github/vicontiveros00</a>.</p>
            </div>
    )
}

export default Home;