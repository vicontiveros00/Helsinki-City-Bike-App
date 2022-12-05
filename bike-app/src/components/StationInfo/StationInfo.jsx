import React, { useState, useEffect } from "react";
import apiCaller from "../../util/apiCaller";
import Map from "../../util/Map";
import { useParams } from 'react-router-dom';

function StationInfo(props) {
    const api = props.api;
    console.log(api);
    const { id } = useParams();
    const [ station, setStation ] = useState({});

    useEffect(() => {
        apiCaller.getStationById(api, id).then((station) => {
            setStation(station);
        })
    }, []);

    return (
        <>
            <Map address={station.osoite} city={station.kaupunki} />
            <p>{`${station.nimi} Station` || 'Loading info...'}</p>
            <small>{`På Svenska: ${station.namn}`}</small>
        </>
    )
}

export default StationInfo;