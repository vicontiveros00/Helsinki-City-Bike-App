import { Link } from "react-router-dom";

function Station({ station }) {
    //renders each row in stations list
    const { id, nimi, kaupunki } = station || null;
    //deconstruct station object get needed vals or set to null to avoid crash

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