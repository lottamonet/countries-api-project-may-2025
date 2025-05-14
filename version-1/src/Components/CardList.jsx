import React from "react";
import { useState, useEffect } from "react";
import Card from "./Card";


function CardList({data}) {
const [countries, setCountries] = useState(null);
const [searchCountry, setSearchCountry] = useState({countrySearch: ''});

const handleSearchCountry = (e) => {
    const value = e.target.value;
    setSearchCountry({ ...searchCountry, [e.target.name]: value });
    console.log(searchCountry);
};



useEffect(() => {
if (data) {
    setCountries(data)
    console.log(countries, 'countries')
}
console.log('useEffect ran');
} , [data])

let sortedCountries = [...countries].sort((a, b) => a.name.common.localeCompare(b.name.common));
let countriesArray = sortedCountries.map((country, i) => (
<Card 
imageSrc={country.flags.png} 
imageAlt={country.flags.alt}  
name={country.name.common} 
population={country.population} 
region={country.region} 
capital={country.capital} 
key={i} 
/> 

));



    return (
        <div id='cardContainer'>
            <div id="search-section">
            <label htmlFor="search" id="search-label" >Search</label><br/>
            <input type="search" name="countrySearch" id="country"  value={searchCountry.countrySearch}  onChange={e => handleSearchCountry(e)} /><br/>
            <button type="submit" id="search-btn" onClick={getCountry} >Search</button>
        </div>
            {countriesArray }
        </div>
        
    )
}

export default CardList;