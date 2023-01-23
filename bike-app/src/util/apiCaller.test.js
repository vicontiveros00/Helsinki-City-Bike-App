import * as apiCaller from './apiCaller';
import { describe, expect, it } from 'vitest';
import { apiUrl } from '../App';

describe('#getAllStations', () => {
    it("Returns station object with expected key 'items'", async () => {
        const data = await apiCaller.getAllStations(apiUrl, 1);
        expect(data).toHaveProperty('items');
    })
});

describe('#searchStations', () => {
    it("Returns station object with search query with expected key 'items'", async () => {
        const data = await apiCaller.searchStations(apiUrl, 'Alakiventie');
        expect(data).toHaveProperty('items');
    })
})

describe('#getStationById', () => {
    it("Returns station object with given ID with expected key 'id'", async () => {
        const data = await apiCaller.getStationById(apiUrl, 3);
        expect(data).toHaveProperty('id', '3');
    })
})

describe('#getJourneys', () => {
    it("Returns journey object with sort method with expected key 'items'", async () => {
        const data = await apiCaller.getJourneys(apiUrl, 1, 'departure');
        expect(data).toHaveProperty('items');
    })
})

describe('#getLongestJourney', () => {
    it("Returns journey object with expected key 'items'", async () => {
        const data = await apiCaller.getLongestJourney(apiUrl);
        expect(data).toHaveProperty('items');
    })
})