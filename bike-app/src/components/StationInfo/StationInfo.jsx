import React, { useState, useEffect } from "react";
import apiCaller from "../../util/apiCaller";
import Map from "../../util/Map";
import { useParams } from 'react-router-dom';
import './StationInfo.css'

function StationInfo(props) {
    const api = props.api;
    const { id } = useParams();
    const [ station, setStation ] = useState({});
    const { nimi, namn, osoite, adress, kaupunki, stad, kapasiteet, num_from, num_to} = station || null;

    useEffect(() => {
        apiCaller.getStationById(api, id).then((station) => {
            setStation(station);
        })
    }, []);

    return (
        <div className="info">
            <h2>{`🚲 ${nimi} Station 🚲` || 'Loading info...'}</h2>
            <Map address={osoite} city={kaupunki} />
            <p className="swe">{namn} finns på {adress} i {stad}.</p>
            <p>Address: {osoite}, {kaupunki}</p>
            <p>Bike capacity: <strong>{kapasiteet}</strong></p>
            <p>According to the data...</p>
            <ul>
                <li><strong>{num_from}</strong> trips started here</li>
                <li><strong>{num_to}</strong> trips have ended here</li>
            </ul>
        </div>
    )
}

export default StationInfo;