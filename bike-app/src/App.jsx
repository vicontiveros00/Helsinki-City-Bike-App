import Home from './components/Home/Home';
import Stations from './components/Stations/Stations';
import StationInfo from './components/StationInfo/StationInfo';
import Journeys from './components/Journeys/Journeys';
import { Link, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'

export const apiUrl = 'https://helbikeappvic.fly.dev';

const App = () => {
  //decided not to require authentication so devs can run a dev build without any setup on the backend, db will remain read-only

  return (
    <>
      <nav>
        <ul>
          {/*Navigation*/}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/stations">Stations</Link></li>
          <li><Link to="/journeys">Journeys</Link></li>
        </ul>
      </nav>
      <main>
          {/*Routing*/}
          <Routes>
            <Route path="/" element={<Home api={apiUrl}/>} />
            <Route path="/stations" element={<Stations api={apiUrl}/>} />
            <Route path="/stations/:id" element={<StationInfo api={apiUrl} />} />
            {/*todo: get nested route working */}
            <Route path="/journeys" element={<Journeys api={apiUrl}/>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </main>
      <div className="footer">
        <p>Coded with love by <a href="https://github.com/vicontiveros00">github/vicontiveros00</a>.</p>
      </div>
    </>
  )
}

export default App;
