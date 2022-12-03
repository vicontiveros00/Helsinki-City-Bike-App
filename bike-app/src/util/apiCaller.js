const apiCaller = {
    async getAllStations(url) {
        const res = await fetch(`${url}/api/collections/stations/records?perPage=500`);
        const data = await res.json();
        return data.items;
    }
}

export default apiCaller;