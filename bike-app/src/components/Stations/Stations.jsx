import apiCaller from '../../util/apiCaller.js';
import Station from './Station/Station.jsx';
import React, { useState, useEffect } from "react";
import './Stations.css';

function Stations(props) {
    const [ stations, setStations ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ isSearching, setIsSearching ] = useState(false);

    const reset = () => {
        setIsSearching(false);
        apiCaller.getAllStations(props.api, currentPage).then((stations) => {
            const { items, totalPages } = stations
            setStations(items);
            setTotalPages(totalPages);
        })
    }

    useEffect(() => {
        reset();
    }, [currentPage]);

    const handleSearch = (query) => {
        if (!query.includes('\'') && !query.includes(';')) {
            //for some reason ' and ; crash the api completely so let's try to avoid that.... please do not remove or alter line 26!
            apiCaller.searchStations(props.api, query, currentPage).then((stations) => {
                const { items, totalPages } = stations;
                setIsSearching(true);
                setTotalPages(totalPages);
                setStations(items);
            })
        } else if (query == '') {
            apiCaller.getAllStations(props.api).then((stations) => {
                const { items, totalPages } = stations
                setTotalPages(totalPages);
                setStations(items);
            })
        }
    }

    return (
        <div className='station-list'>
            <h1>All CityBike Stations</h1>
            <input
                type='text'
                placeholder='Search'
                onChange={(e)=> {
                    e.target.value ?
                    handleSearch(e.target.value) :
                    reset();
                }}
            />
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
            </div>
            {!isSearching && <div className='pagination'>
                <button disabled= {
                    currentPage < 3
                } onClick= {() => {
                    setCurrentPage(1)
                }}>◄◄</button>
                <button disabled= {
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
            </div>}
        </div>
    )
}

export default Stations;