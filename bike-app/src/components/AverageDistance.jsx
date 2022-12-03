import { useState } from 'react'
import '../App.css'

function AverageDistance() {
  const [start, setStart] = useState('');
  const [destination, setDestination] = useState('');
  const [distance, setDistance] = useState(null);
  const url = 'http://127.0.0.1:8090/api/collections/';

  const findJourneyData = async(start, end) => {
    try {
      const res = await fetch(`${url}journeys/records?filter=departure_station_name='${start}'&&return_station_name='${end}'`, {
        cache: 'no-store',
      });
      const data = await res.json();
      console.log(data.items[0].distance_m);
      setDistance(data.items[0].distance_m);
      return data.items[0];
    } catch(err) {
      console.log(err)
      setDistance('noroute');
    }
  } 

  return (
    <>
      <input 
        type="text"
        placeholder='start'
        value={start}
        onChange={(e) => setStart(e.target.value)}
      />
      <input 
        type="text"
        placeholder='destination'
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button type="submit" onClick={() => findJourneyData(start, destination)}>find</button>
      <p>{distance && distance !== 'noroute' ? `Average distance between stations is ${distance} meters.` : 'No route found'}</p>
    </>
  )
}

export default AverageDistance;
