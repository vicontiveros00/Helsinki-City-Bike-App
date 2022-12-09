import apiCaller from '../../util/apiCaller.js';
import Station from './Station/Station.jsx';
import Error from '../../util/Error';
import React, { useState, useEffect } from "react";
import PulseLoader from 'react-spinners/PulseLoader';
import './Stations.css';

function Stations(props) {
    const [ stations, setStations ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isSearching, setIsSearching ] = useState(false);
    const [ isLoading, setIsLoading ] = useState(true);
    const [ hasError, setHasError ] = useState(false);

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        throw new Error('Unable to get stations. Call Vic!');
    }

    const reset = () => {
        setIsLoading(true);
        setIsSearching(false);
        apiCaller.getAllStations(props.api, currentPage).then((stations) => {
            const { items, totalPages } = stations
            setStations(items);
            setTotalPages(totalPages);
            setIsLoading(false);
        }).catch(() => {
            handleError();
        })
    }

    useEffect(() => {
        reset();
    }, [currentPage]);

    const handleSearch = (query) => {
        if (!query.includes('\'') && !query.includes(';')) {
            //for some reason ' and ; causes api errors
            apiCaller.searchStations(props.api, currentPage, query).then((stations) => {
                const { items, totalPages } = stations;
                setIsSearching(true);
                setTotalPages(totalPages);
                setStations(items);
            }).catch(() => {
                handleError();
            })
        } else if (query == '') {
            apiCaller.getAllStations(props.api, currentPage).then((stations) => {
                const { items, totalPages } = stations
                setTotalPages(totalPages);
                setStations(items);
                setCurrentPage(1);
            }).catch(() => {
                handleError();
            })
        }
    }

    return (
        <>
        {!hasError ?
        <div className='station-list'>
            <h1>All City Bike Stations</h1>
                <input
                    type='text'
                    placeholder='Search by name or address'
                    onChange={(e)=> {
                        e.target.value ?
                        handleSearch(e.target.value) :
                        reset();
                    }}
                />
                {!isSearching && <div className='pagination'>
                    <button disabled= {
                        currentPage < 3
                    } onClick= {() => {
                        setCurrentPage(1);
                    }}>◄◄</button>
                    <button disabled= {
                        currentPage <= 1 ? true : false
                    } onClick={() => {
                        setCurrentPage(currentPage - 1)
                    }}>◄</button>
                    <p>{currentPage} of {totalPages > 0 ? totalPages : 1}</p>
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
                </div>}
                {!isLoading ?
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
                </>
                }
        </div> : 
        <Error />
        }
        </>
    ) 
}

export default Stations;