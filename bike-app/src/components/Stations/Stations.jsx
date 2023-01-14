import apiCaller from '../../util/apiCaller.js';
import Station from './Station/Station.jsx';
import Error from '../../util/Error';
import Pagination from '../Pagination/Pagination.jsx';
import React, { useState, useEffect } from "react";
import PulseLoader from 'react-spinners/PulseLoader';
import './Stations.css';

function Stations(props) {
    //stations list
    const url = props.api;
    //grab api url from app.jsx
    const [ stations, setStations ] = useState([]);
    //holds array of station objects from api call
    const [ totalPages, setTotalPages ] = useState(1);
    //holds amount of pages from api call
    const [ currentPage, setCurrentPage ] = useState(1);
    //holds current page from user input
    const [ isSearching, setIsSearching ] = useState(false);
    //true if api request is pending
    const [ isLoading, setIsLoading ] = useState(false);
    //if loading is true, render pulse loader
    const [ hasError, setHasError ] = useState(false);
    ////handle error is api call is unsuccesful

    const handleError = () => {
        //error handler
        setIsLoading(false);
        setHasError(true);
        throw new Error('Unable to get stations. Call Vic!');
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

    const reset = () => {
        //reset states
        setIsLoading(true);
        //get stations on current page
        apiCaller.getAllStations(url, currentPage).then((stations) => {
            const { items, totalPages } = stations
            setStations(items);
            if (items.code === 404) {
                handleError();
            }
            setTotalPages(totalPages);
            setIsLoading(false);
            setIsSearching(false);
        }).catch(() => {
            handleError();
        })
    }

    useEffect(() => {
        //reset other states if current page updates
        reset();
    }, [currentPage]);

    const handleSearch = (query) => {
        //search handler
        if (!query.includes('\'') && !query.includes(';')) {
            console.log(query);
            //for some reason ' and ; causes api errors, avoid removing or altering above line
            apiCaller.searchStations(url, query).then((stations) => {
                const { items, totalPages } = stations;
                setIsSearching(true);
                setTotalPages(totalPages);
                setStations(items);
                //set items to stations state to render results
            }).catch(() => {
                handleError();
            })
        } else if (query == '') {
            reset();
            //reset states when input contains empty string
        }
    }

    return (
        <>
        {!hasError ?
        <div className='station-list'>
            <h1>All City Bike Stations</h1>
                <input
                    type='text'
                    maxLength='10'
                    //overly long requests slow down api
                    placeholder='Search by name or address'
                    onChange={(e)=> {
                        e.target.value ?
                        handleSearch(e.target.value) :
                        reset();
                    }}
                />
                {!isSearching && <Pagination 
                    handleFirstButton = {handleFirstButton}
                    handleSecondButton = {handleSecondButton}
                    handleThirdButton = {handleThirdButton}
                    handleLastButton = {handleLastButton}
                    currentPage = {currentPage}
                    totalPages = {totalPages}
                />}
                {!isLoading ?
                //render stations if no pending api request
                <div className='stations'>
                    <table>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <th>City</th>
                            </tr>
                            {stations.map((station) => {
                                return (
                                    <tr>
                                        <Station key={station.id} station={station} />
                                        {/*render row for each station object in station array, default 10 per api caller*/}
                                    </tr>
                                )
                            })}
                              
                        </tbody>
                    </table>
                </div> : 
                <>
                    <PulseLoader color="#646cff" cssOverride={{
                        display: 'flex',
                        justifyContent: 'center',
                        margin: '1rem'
                    }}/>
                    {/*render pulse loader when waiting for new stations*/}
                </>
                }
        </div> : 
        <Error /> //display error message if api call unsuccesful
        }
        </>
    ) 
}

export default Stations;