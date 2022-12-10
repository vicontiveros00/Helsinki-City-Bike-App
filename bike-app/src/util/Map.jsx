function Map(props) {
    //google maps in iframe
    const address = props.address;
    const city = props.city;

    return (
        <iframe
            src={`https://maps.google.com/maps?q=${address}+${city}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
    )
}

export default Map;