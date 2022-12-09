//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Journey from './Journey/Journey';
import apiCaller from '../../util/apiCaller';
import PulseLoader from 'react-spinners/PulseLoader';
import Error from '../../util/Error';
import './Journeys.css';

function Journeys(props) {
    const [ journeys, setJourneys ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false);
    const [ sortMethod, setSortMethod ] = useState('departure');

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        throw new Error('Unable to get journeys. Call Vic!');
    }

    useEffect(() => {
        setIsLoading(true);
        apiCaller.getJourneys(props.api, currentPage, sortMethod).then((journeys) => {
            const { items, totalPages } = journeys;
            setJourneys(items);
            setTotalPages(totalPages);
            setIsLoading(false);
        }).catch(() => {
            handleError();
        })
    }, [currentPage, sortMethod]);
    
    return (
        <>
        {!hasError ?
        <div className='journey-list'>
            {window.innerWidth < 800 && <p>Table doesn't look good on smaller screens :(</p>}
            <h1>All City Bike Journeys</h1>
            <div className='pagination'>
                <button disabled= {
                     currentPage < 3
                } onClick= {() => {
                    setCurrentPage(1)
                }}>◄◄</button>
                <button disabled={
                    currentPage <= 1 ? true : false
                } onClick={() => {
                    setCurrentPage(currentPage - 1)
                }}>◄</button>
                <p>{currentPage} of {totalPages}</p>
                <button disabled={
                    currentPage >= totalPages ? true : false
                } onClick={() => {
                    setCurrentPage(currentPage + 1)
                }}>►</button>
                <button disabled= {
                    currentPage >= totalPages - 1
                } onClick= {() => {
                    setCurrentPage(totalPages)
                }}>►►</button>
            </div>
            <div className='journeys'>
                {!isLoading ? 
                <table>
                    <tbody>
                        <tr>
                            <th className='filter' onClick={() => {
                                setCurrentPage(1);
                                setSortMethod(sortMethod === '-departure' ? 'departure' : '-departure');
                            }}>Departure</th>
                            <th className='filter' onClick={() => {
                                setCurrentPage(1);
                                setSortMethod(sortMethod === '-return_time' ? 'return_time' : '-return_time');
                            }}>Return</th>
                            <th>From</th>
                            <th>To</th>
                            <th className='filter' onClick={() => {
                                setCurrentPage(1);
                                setSortMethod(sortMethod === '-distance_m' ? 'distance_m' : '-distance_m');
                            }}>Distance</th>
                            <th className='filter' onClick={() => {
                                setCurrentPage(1);
                                setSortMethod(sortMethod === '-duration_s' ? 'duration_s' : '-duration_s');
                            }}>Duration</th>
                        </tr>
                {journeys.map((journey) => {
                    return (
                        <tr>
                            <Journey key={journey.id} journey={journey} />
                        </tr>
                    )
                })}
                    </tbody>
                </table> : 
                    <>
                        <PulseLoader color="#646cff" cssOverride={{
                            display: 'flex',
                            justifyContent: 'center',
                            margin: '1rem'
                        }}/>
                    </>
                }
            </div>
        </div> : 
        <Error />
        }
        </>
    )
}

export default Journeys;