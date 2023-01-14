import React, { useState, useEffect } from "react";
import apiCaller from "../../util/apiCaller";
import Map from "../../util/Map";
import PulseLoader from "react-spinners/PulseLoader";
import Error from "../../util/Error";
import { useParams } from 'react-router-dom';
import './StationInfo.css'

function StationInfo(props) {
    //station info page
    const api = props.api;
    //get api url from app.jsx
    const { id } = useParams();
    //get id paramater from url to fetch station by id
    const [ station, setStation ] = useState({});
    //holds station object
    const { nimi, namn, osoite, adress, kaupunki, stad, kapasiteet, num_from, num_to} = station || null;
    //deconstruct station object and get vals, if no station set to null to avoid crashing
    const [ hasError, setHasError ] = useState(false);

    const containsWordAsema = (word) => {
        return !word.includes('asema' || 'Asema');
    }
    //do not display the word 'station' if the name of the station already contains the substring 'asema'

    useEffect(() => {
        //get station and update state to re-render
        //render error message if api call unsuccesful
        apiCaller.getStationById(api, id).then((station) => {
            setStation(station);
        }).catch(() => {
            setHasError(true);
            throw new Error('Unable to get station data. Call Vic!')
        })
    }, []);

    return (
        <>
        {!hasError ? //checks there is no api error
            <>
            {nimi ? //checks if station has a name, meaning station info has loaded in
                <div className="info">
                    <h2>{`${nimi} `}{containsWordAsema(nimi) && 'Station '}<span className="bike">🚲</span></h2>
                    <div className="container">
                        <Map address={osoite} city={kaupunki} />
                        <div>
                            <p className="swe">{namn} finns på {adress} i {stad}.</p>
                            <p>Address: {osoite}, {kaupunki}</p>
                            <p>Bike capacity: <strong>{kapasiteet}</strong></p>
                            <p>According to the data...</p>
                            <ul>
                                <li><strong>{num_from}</strong> trips started here</li>
                                <li><strong>{num_to}</strong> trips have ended here</li>
                            </ul>
                        </div>
                    </div>
                </div>
            : //render pulse loader while waiting for station
            <PulseLoader color="#646cff" cssOverride={{
                display: 'flex',
                justifyContent: 'center',
                margin: '1rem'
            }}/>
            }</> :
            <Error />
            //render error message
        }
        </>
    )
}

export default StationInfo;