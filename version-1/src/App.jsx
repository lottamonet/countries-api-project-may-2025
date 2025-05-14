import { Routes, Route, Link, data } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from "./Pages/home.jsx";
import CountryDetail from "./Pages/countryDetail.jsx";
import SavedCountries from "./Pages/savedCountries.jsx";
import localData from './data/localData.js';



function App() {
  const [data, setData] = useState([]);
  

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('https://restcountries.com/v3.1/all');
      const json = await response.json();
      console.log(json, 'data');
      setData(json)
      console.log(data, 'test')
  } catch (error) {
      console.error("Error fetching data:", error);
  
  }
};
fetchData();
}, [])

 
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
      
      {/* <Routes>
        <Route path="/" element={<Home data={data} />} />
        <Route path="/countryDetail" element={<CountryDetail data={data} />} />
        <Route path="/savedCountries" element={<SavedCountries data={data}/>} />
      </Routes> */}
    </div>

        
    </>
  )
}

export default App
