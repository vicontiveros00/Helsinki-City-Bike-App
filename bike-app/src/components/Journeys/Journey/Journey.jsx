function Journey({ journey }) {
   const { departure, return_time, departure_station_name, return_station_name, distance_m, duration_s } = journey || null;
   const depart = new Date(departure);
   const retur = new Date(return_time); //obviously you cant have a var named 'return'
   
   return (
    <div className="journey">
        <p>Departed: {depart.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short'
        })}</p>
        <p>Returned: {retur.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short'
        })}</p>
        <p>Departed from: {departure_station_name}</p>
        <p>Returned to: {return_station_name}</p>
        <p>Distance: {distance_m} meters</p>
        <p>Duration: {duration_s} seconds</p>
        <hr></hr>
    </div>
   )
}

export default Journey;