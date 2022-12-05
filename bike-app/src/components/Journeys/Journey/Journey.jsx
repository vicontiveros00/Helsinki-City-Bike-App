function Journey({ journey }) {
   const { id, departure, return_time, departure_station_name, return_station_name, distance_m, duration_s } = journey || null;
   const depart = new Date(departure);
   const retur = new Date(return_time); //obviously you cant have a var named 'return'
   
   return (
    <>
        <td>{id}</td>
        <td>{depart.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short'
        })}</td>
        <td>{retur.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short'
        })}</td>
        <td>{departure_station_name}</td>
        <td>{return_station_name}</td>
        <td>{distance_m}</td>
        <td>{duration_s}</td>
    </>
   )
}

export default Journey;