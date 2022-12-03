import { Link } from 'react-router-dom';
import React from 'react';

function Journeys() {
    return (
        <>
            <p>This is where journeys table will go</p>
            <img src="https://media4.giphy.com/media/WiXMlla4ZFR8Q/giphy.gif" />
            <button>
                <Link to={"/journeys/average"}>Calculate Average Distances</Link>
            </button>
        </>
    )
}

export default Journeys;