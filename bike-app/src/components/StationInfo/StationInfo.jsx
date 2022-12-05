import React, { useState, useEffect } from "react";
import apiCaller from "../../util/apiCaller";
import Map from "../../util/Map";
import { useParams } from 'react-router-dom';
import './StationInfo.css'

function StationInfo(props) {
    const api = props.api;
    const { id } = useParams();
    const [ station, setStation ] = useState({});
    const { nimi, namn, osoite, adress, kaupunki, kapasiteet} = station || null;

    useEffect(() => {
        apiCaller.getStationById(api, id).then((station) => {
            setStation(station);
        })
    }, []);

    return (
        <div className="info">
            <h2>{`🚲 ${nimi} Station` || 'Loading info...'}</h2>
            <Map address={osoite} city={kaupunki} />
            <p className="swe">{`På Svenska: ${namn} finns på ${adress}.`}</p>
            <p>{`${osoite}, ${kaupunki === '\'\'' ? 'Helsinki' : kaupunki}`}</p>
            <p>{`Bike capacity: ${kapasiteet}`}</p>
            <p>{`0 trips have started here.`}</p>
            <p>{`0 trips have ended here.`}</p>
        </div>
    )
}

export default StationInfo;