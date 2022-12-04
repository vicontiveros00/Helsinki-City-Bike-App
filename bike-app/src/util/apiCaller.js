const apiCaller = {
    async getAllStations(url, page) {
        const res = await fetch(`${url}/api/collections/stations/records?perPage=5&page=${page}`);
        const data = await res.json();
        return data;
    },
    async searchStations(url, query) {
        const res = await fetch(`${url}/api/collections/stations/records?perPage=500&filter=(nimi~'${query}'||osoite~'${query}'||kaupunki~'${query}')`);
        const data = await res.json();
        return data;
    }
}

export default apiCaller;