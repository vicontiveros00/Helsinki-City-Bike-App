const apiCaller = {
    async getAllStations(url, page) {
        const res = await fetch(`${url}/api/collections/stations/records?perPage=10&page=${page}&sort=nimi`);
        const data = await res.json();
        return data;
    },
    async searchStations(url, query) {
        const res = await fetch(`${url}/api/collections/stations/records?perPage=500&filter=(nimi~'${query}'||osoite~'${query}'||kaupunki~'${query}')`);
        const data = await res.json();
        return data;
    },
    async getStationById(url, id) {
        const res = await fetch(`${url}/api/collections/stations/records/${id}`);
        const data = await res.json();
        return data;
    },
    async getJourneys(url, page) {
        const res = await fetch(`${url}/api/collections/journeys/records?perPage=10&page=${page}`);
        const data = await res.json();
        return data;
    }
}

/*Päivä! If you're reading this, thanks for looking at my code. Solita iz da best!*/

export default apiCaller;