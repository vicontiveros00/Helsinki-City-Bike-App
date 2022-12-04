import React from "react";
import { useParams } from 'react-router-dom';

function StationInfo() {
    const { id } = useParams();
    return (
        <p>{`Station ${id}`}</p>
    )
}

export default StationInfo;