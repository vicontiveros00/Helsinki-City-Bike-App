import React, { useState, useEffect } from "react";
import { getStationById } from "../../util/apiCaller";
import Map from "../../util/Map";
import PulseLoader from "react-spinners/PulseLoader";
import Error from "../../util/Error";
import { useParams } from 'react-router-dom';
import './StationInfo.css'

const StationInfo = ({ api }) => {
    //station info page
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
    const handleError = () => {
        setHasError(true);
        throw new Error('Unable to get station info. Call Vic!');
    }

    useEffect(() => {
        //get station and update state to re-render
        const getStation = async () => {
            try {
                const station = await getStationById(api, id);
                station.code ? handleError() : setStation(station);
                //if the api returns a status code it means the request was unseccesful
            } catch (err) {
                //render error message if api call unsuccesful
                handleError();
                throw new Error(err);
            }
        }
        getStation();
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
                        </div> : //render pulse loader while waiting for station
                        <PulseLoader color="#646cff" cssOverride={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1rem'
                        }}/>
                    }
                </> :
                <Error />
                //render error message
            }
        </>
    )
}

export default StationInfo;