import { Link } from "react-router-dom";

function Station({ station }) {
    const { id, nimi, kaupunki } = station || null;

    return (
        <>
            <td>
                <Link to={`/stations/${id}`}>{nimi}</Link>
            </td>
            <td>{kaupunki}</td>
        </>
        
    )
}

export default Station;