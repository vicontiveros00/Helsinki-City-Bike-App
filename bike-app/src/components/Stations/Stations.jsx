import apiCaller from '../../util/apiCaller.js';
import React, { useState, useEffect } from "react";

function Stations(props) {
    const [stations, setStations] = useState([]);

    apiCaller.getAllStations(props.api).then((stations) => {
        setStations(stations);
    })

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

function Station({ station }) {
    const { nimi, osoite, kaupunki, kapasiteet} = station || null;

    return (
        <div className='station'>
            <p>Name: {nimi}</p>
            <p>Address: {osoite}</p>
            <p>City: {kaupunki === '\'\'' ? 'Helsinki' : kaupunki}</p>
            <p>Capacity: {kapasiteet}</p>
            <hr></hr>
        </div>
    )
}

export default Stations;