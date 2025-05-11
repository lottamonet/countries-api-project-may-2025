import { Routes, Route, Link } from 'react-router-dom';
import Home from "./Pages/home.jsx";
import CountryDetail from "./Pages/countryDetail.jsx";
import SavedCountries from "./Pages/savedCountries.jsx";
import localData from './data/localData.js';
import Card from './Components/Card.jsx';


function App() {

  return (
    <>
    <nav>
        <ul id='navList'>
          <li className='where'>
            <Link to="/">Where in the World</Link>
          </li>
          <li className='saved'>
            <Link to="/savedCountries">Saved Countries</Link>
          </li>
        </ul>
      </nav>
     <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countryDetail" element={<CountryDetail />} />
        <Route path="/savedCountries" element={<SavedCountries />} />
      </Routes>
    </div>

        
    </>
  )
}

export default App
