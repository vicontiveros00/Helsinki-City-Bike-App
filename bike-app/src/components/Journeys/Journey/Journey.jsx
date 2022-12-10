import { Link } from "react-router-dom";
import toDaysMinutesSeconds from "../../../util/timeFormatter";

function Journey({ journey }) {
    //render each row in journey's table
   const { departure, return_time, departure_station_id,  departure_station_name, return_station_id, return_station_name, distance_m, duration_s } = journey || null; //deconstruct journey object and get vals, if no journey set to null to avoid crashing
   const depart = new Date(departure);
   const retur = new Date(return_time); //obviously you cant have a var named 'return'
   
   return (
    <>
        <td>{depart.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short' //format dates using Intl.DateTimeFormat api
        })}</td>
        <td>{retur.toLocaleString('fi-FI', {
            dateStyle: 'short',
            timeStyle: 'short'
        })}</td>
        <td>
            <Link to={`/stations/${departure_station_id}`}>{departure_station_name}</Link>
            {/*link to station info*/}
        </td>
        <td>
            <Link to={`/stations/${return_station_id}`}>{return_station_name}</Link>
        </td>
        <td>{(distance_m / 1000).toFixed(2)} km</td>
        {/*display meters in kilometers*/}
        <td>{toDaysMinutesSeconds(duration_s)}</td>
    </>
   )
}

export default Journey;