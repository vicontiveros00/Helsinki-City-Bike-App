function Station({ station }) {
    const { nimi, osoite, kaupunki, kapasiteet} = station || null;

    return (
        <div className='station'>
            <p>Name: {nimi}</p>
            <p>Address: {osoite}</p>
            <p>City: {kaupunki === '\'\'' ? 'Helsinki' : kaupunki}</p>
            <p>Capacity: {kapasiteet}</p>
            <hr></hr>
        </div>
    )
}

export default Station;