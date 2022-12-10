import React, { useEffect, useState } from 'react';
import Journey from './Journey/Journey';
import apiCaller from '../../util/apiCaller';
import PulseLoader from 'react-spinners/PulseLoader';
import Error from '../../util/Error';
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
            <div className='pagination'>
                <button disabled= {
                     currentPage < 3
                     //disable button if page is before page 3
                } onClick= {() => {
                    setCurrentPage(1);
                    //return to first page
                }}>◄◄</button>
                <button disabled={
                    currentPage <= 1
                    //disable button if user already on first page
                } onClick={() => {
                    setCurrentPage(currentPage - 1);
                    //go one page back
                }}>◄</button>
                <p>{currentPage} of {totalPages}</p>
                <button disabled={
                    currentPage >= totalPages
                    //disable button if user is on last page
                } onClick={() => {
                    setCurrentPage(currentPage + 1);
                    //go one page forward
                }}>►</button>
                <button disabled= {
                    currentPage >= totalPages - 1
                    //disable button if user is on last 2 pages
                } onClick= {() => {
                    setCurrentPage(totalPages);
                    //send user to last page
                }}>►►</button>
            </div>
            <div className='journeys'>
                {!isLoading ? //render table if no pending api request
                <table>
                    <tbody>
                        <tr>
                            <th className='filter' onClick={() => {
                                setCurrentPage(1);
                                //revert user back to first page when sort method is updated
                                setSortMethod(sortMethod === '-departure' ? 'departure' : '-departure');
                                //update sort method, if sort method is already departure DESC set it to departure ASC
                                //continue same logic onto other th elements
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