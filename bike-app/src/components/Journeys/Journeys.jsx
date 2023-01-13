import React, { useEffect, useState } from 'react';
import Journey from './Journey/Journey';
import apiCaller from '../../util/apiCaller';
import PulseLoader from 'react-spinners/PulseLoader';
import Error from '../../util/Error';
import Pagination from '../Pagination/Pagination';
import './Journeys.css';

function Journeys(props) {
    //journeys table
    const url = props.api;
    //grab api url from app.jsx
    const [ journeys, setJourneys ] = useState([]);
    //holds array of journey objects from api call
    const [ totalPages, setTotalPages ] = useState(1);
    //holds amount of pages from api call
    const [ currentPage, setCurrentPage ] = useState(1);
    //holds current page from user input
    const [ isLoading, setIsLoading ] = useState(true);
    //if loading is true, render pulse loader
    const [ hasError, setHasError ] = useState(false);
    //handle error is api call is unsuccesful
    const [ sortMethod, setSortMethod ] = useState('departure');
    //holds sort method from user input

    const handleError = () => {
        //error handler
        setIsLoading(false);
        setHasError(true);
        throw new Error('Unable to get journeys. Call Vic!');
    }

    //next 4 functions are handlers to be passed to pagination to handle updating states here
    const handleFirstButton = () => {
        setCurrentPage(1);
    }

    const handleSecondButton = () => {
        setCurrentPage(currentPage - 1);
    }

    const handleThirdButton = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleLastButton = () => {
        setCurrentPage(totalPages);
    }

    //handle displaying sort marker
    const updateSortMarker = (sort) => {
        setSortMethod(sortMethod === sort ? `-${sort}` : sort)
    }

    useEffect(() => {
        setIsLoading(true);
        apiCaller.getJourneys(url, currentPage, sortMethod).then((journeys) => {
            const { items, totalPages } = journeys;
            setJourneys(items);
            setTotalPages(totalPages);
            setIsLoading(false);
        }).catch(() => {
            handleError();
        })
    }, [currentPage, sortMethod]);
    //get new set of journeys when currentPage or sortMethod states is updated
    //call error handler function if api call is unsuccesful
    
    return (
        <>
        {!hasError ? //render page if there is no error
        <div className='journey-list'>
            {window.innerWidth < 800 && <p>Table doesn't look good on smaller screens :(</p>}
            {/*show message for smaller screens*/}
            <h1>All City Bike Journeys</h1>
            <Pagination 
                handleFirstButton = {handleFirstButton}
                handleSecondButton = {handleSecondButton}
                handleThirdButton = {handleThirdButton}
                handleLastButton = {handleLastButton}
                currentPage = {currentPage}
                totalPages = {totalPages}
            />
            <div className='journeys'>
                {!isLoading ? //render table if no pending api request
                <table>
                    <tbody>
                        <tr>
                            <th className={`filter ${
                                sortMethod === 'departure' || sortMethod === '-departure' ? sortMethod : ''
                                //set appropriate class name based off of sortMethod to show asc/desc marker on table (check Journeys.css)
                            }`} onClick={() => {
                                setCurrentPage(1);
                                //revert user back to first page when sort method is updated
                                updateSortMarker('departure');
                                //update sort method, if sort method is already departure DESC set it to departure ASC, refer to function updateSortMarker
                                //continue same logic onto other th elements
                            }}>Departure</th>
                            <th className={`filter ${
                                sortMethod === 'return_time' || sortMethod === '-return_time' ? sortMethod : ''
                            }`} onClick={() => {
                                setCurrentPage(1);
                                updateSortMarker('return_time');
                            }}>Return</th>
                            <th>From</th>
                            <th>To</th>
                            <th className={`filter ${
                                sortMethod === 'distance_m' || sortMethod === '-distance_m' ? sortMethod : ''
                            }`} onClick={() => {
                                setCurrentPage(1);
                                updateSortMarker('distance_m');
                            }}>Distance</th>
                            <th className={`filter ${
                                sortMethod === 'duration_s' || sortMethod === '-duration_s' ? sortMethod : ''
                            }`} onClick={() => {
                                setCurrentPage(1);
                                updateSortMarker('duration_s');
                            }}>Duration</th>
                        </tr>
                {journeys.map((journey) => {
                    return (
                        <tr>
                            <Journey key={journey.id} journey={journey} />
                            {/*render row for each journey in journey array, default 10 per api caller*/}
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
                        {/*render pulse loader when waiting for new journeys*/}
                    </>
                }
            </div>
        </div> : 
        <Error /> //display error message if api call unsuccesful
        }
        </>
    )
}

export default Journeys;