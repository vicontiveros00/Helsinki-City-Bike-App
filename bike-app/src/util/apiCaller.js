export const getAllStations = async (url, page) => {
    //request contains an array of 10 stations in object form with specified page from stations dataset
    const res = await fetch(`${url}/api/collections/stations/records?perPage=10&page=${page}&sort=nimi`);
    return res.json();
}

export const searchStations = async (url, query) => {
    //search station and return an array of 10 stations in object form that match specified query through name, address, and city
    const res = await fetch(`${url}/api/collections/stations/records?perPage=10&filter=(nimi~'${query}'||osoite~'${query}'||kaupunki~'${query}')`);
    return res.json();
}

export const getStationById = async (url, id) => {
    //gets station by it's id to be displayed in station info page
    const res = await fetch(`${url}/api/collections/stations/records/${id}`);
    return await res.json();
}

export const getJourneys = async (url, page, sort) => {
    //gets list of 10 journeys at specified page with a sort method
    const res = await fetch(`${url}/api/collections/journeys/records?perPage=10&page=${page}&sort=${sort}`);
    return await res.json();
}

export const getLongestJourney = async (url) => {
    //gets longest journey from journey dataset to be displayed on home page
    const res = await fetch(`${url}/api/collections/journeys/records?perPage=1&page=1&sort=-distance_m`);
    return await res.json();
}