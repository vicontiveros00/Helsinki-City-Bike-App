import React from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
//import all components for render test
import Home from './components/Home/Home';
import Journey from './components/Journeys/Journey/Journey';
import Journeys from './components/Journeys/Journeys';
import Pagination from './components/Pagination/Pagination';
import StationInfo from './components/StationInfo/StationInfo';
import Station from './components/Stations/Station/Station';
import Stations from './components/Stations/Stations';
import Map from './util/Map';

describe('#Home', () => {
    it('Home component is capable of rendering to the DOM'), () => {
        const home = render(<Home />);
        expect (home.fistChild).toBeInTheDocument();
        //test asserts that the first child of the container is in the document, which means the component is rendered
    }
})

describe('#Journey', () => {
    it('Journey component is capable of rendering to the DOM'), () => {
        const journey = render(<Journey />);
        expect (journey.fistChild).toBeInTheDocument();
    }
})

describe('#Journey', () => {
    it('Journey component is capable of rendering to the DOM'), () => {
        const journey = render(<Journey />);
        expect (journey.fistChild).toBeInTheDocument();
    }
})

describe('#Journeys', () => {
    it('Journeys component is capable of rendering to the DOM'), () => {
        const journeys = render(<Journeys />);
        expect (journeys.fistChild).toBeInTheDocument();
    }
})

describe('#Pagination', () => {
    it('Pagination component is capable of rendering to the DOM'), () => {
        const pagination = render(<Pagination />);
        expect (pagination.fistChild).toBeInTheDocument();
    }
})

describe('#StationInfo', () => {
    it('StationInfo component is capable of rendering to the DOM'), () => {
        const stationinfo = render(<StationInfo />);
        expect (stationinfo.fistChild).toBeInTheDocument();
    }
})

describe('#Station', () => {
    it('Station component is capable of rendering to the DOM'), () => {
        const station = render(<Station />);
        expect (station.fistChild).toBeInTheDocument();
    }
})

describe('#Stations', () => {
    it('Stations component is capable of rendering to the DOM'), () => {
        const stations = render(<Stations />);
        expect (stations.fistChild).toBeInTheDocument();
    }
})

describe('#Error', () => {
    it('Error component is capable of rendering to the DOM'), () => {
        const error = render(<Error />);
        expect (error.fistChild).toBeInTheDocument();
    }
})

describe('#Map', () => {
    it('Map component is capable of rendering to the DOM'), () => {
        const map = render(<Map />);
        expect (map.fistChild).toBeInTheDocument();
    }
})