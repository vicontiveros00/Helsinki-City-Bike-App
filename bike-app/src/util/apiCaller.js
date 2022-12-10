const apiCaller = {
    //utility to handle api requests
    async getAllStations(url, page) {
        //request contains an array of 10 stations in object form with specified page from stations dataset
        const res = await fetch(`${url}/api/collections/stations/records?perPage=10&page=${page}&sort=nimi`);
        const data = await res.json();
        return data;
    },
    async searchStations(url, query) {
        //search station and return an array of 10 stations in object form that match specified query through name, address, and city
        const res = await fetch(`${url}/api/collections/stations/records?perPage=10&filter=(nimi~'${query}'||osoite~'${query}'||kaupunki~'${query}')`);
        const data = await res.json();
        return data;
    },
    async getStationById(url, id) {
        //gets station by it's id to be displayed in station info page
        const res = await fetch(`${url}/api/collections/stations/records/${id}`);
        const data = await res.json();
        return data;
    },
    async getJourneys(url, page, sort) {
        //gets list of 10 journeys at specified page with a sort method
        const res = await fetch(`${url}/api/collections/journeys/records?perPage=10&page=${page}&sort=${sort}`);
        const data = await res.json();
        return data;
    },
    async getLongestJourney(url) {
        //gets longest journey from journey dataset to be displayed on home page
        const res = await fetch(`${url}/api/collections/journeys/records?perPage=1&page=1&sort=-distance_m`);
        const data = await res.json();
        return data.items[0].distance_m;
    }
}

/*Päivä! If you're reading this, thanks for looking at my code. Solita iz da best!*/

export default apiCaller;