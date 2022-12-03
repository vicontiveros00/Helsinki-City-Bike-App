import apiCaller from '../../util/apiCaller.js';
import Station from './Station/Station.jsx';
import React, { useState, useEffect } from "react";

function Stations(props) {
    const [stations, setStations] = useState([]);

    useEffect(() => {
        apiCaller.getAllStations(props.api).then((stations) => {
            setStations(stations);
        })
    }, []);

    return (
        <div className='station-list'>
            <h1>Stations:</h1>
            <div className='stations'>
                {stations.map((station) => {
                    return <Station key={station.id} station={station} />
                })}
            </div>
        </div>
    )
}

export default Stations;