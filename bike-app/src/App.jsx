import Home from './components/Home/Home';
import Stations from './components/Stations/Stations';
import Journeys from './components/Journeys/Journeys';
import AvererageDistance from './components/AverageDistance';
import { Link, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const apiUrl = 'http://127.0.0.1:8090';

  return (
    <>
      <main>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/stations">Stations</Link></li>
            <li><Link to="/journeys">Journeys</Link></li>
          </ul>
        </nav>
          {/*Routing*/}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/stations" element={<Stations api={apiUrl}/>} />
            <Route path="/journeys" element={<Journeys />} />
            <Route path="/journeys/average" element={<AvererageDistance />} />
          </Routes>
      </main>
    </>
  )
}

export default App;
