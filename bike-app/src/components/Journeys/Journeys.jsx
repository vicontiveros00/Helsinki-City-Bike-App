//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Journey from './Journey/Journey';
import apiCaller from '../../util/apiCaller';
import './Journeys.css';

function Journeys(props) {
    const [ journeys, setJourneys ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);

    useEffect(() => {
        apiCaller.getJourneys(props.api, currentPage).then((journeys) => {
            const { items, totalPages } = journeys;
            setJourneys(items);
            setTotalPages(totalPages);
        })
    }, [currentPage])
    
    return (
        <div className='journey-list'>
            {window.innerWidth < 800 && <p>Table doesn't look good on smaller screens :(</p>}
            <h1>All CityBike Journeys</h1>
            <div className='journeys'>
                <table>
                    <tbody>
                        <tr>
                            <th>Departure</th>
                            <th>Return</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Distance</th>
                            <th>Duration</th>
                        </tr>
                {journeys.map((journey) => {
                    return (
                        <tr>
                            <Journey key={journey.id} journey={journey} />
                        </tr>
                    )
                })}
                    </tbody>
                </table>
            </div>
            <div className='pagination'>
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
            </div>
        </div>
    )
}

export default Journeys;