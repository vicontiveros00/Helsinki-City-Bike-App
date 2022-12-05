function Map(props) {
    const address = props.address;
    const city = props.city;

    return (
        <iframe
            width="600"
            height="500"
            src={`https://maps.google.com/maps?q=${address}+${city}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
    )
}

export default Map;