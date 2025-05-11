import React from "react";
import { useState } from "react";
import Card from "./Card";
import localData from "../data/localData";

function CardList() {
const [countries, setCountries] = useState (localData);
let countriesArray = countries.map((country, i) => <Card imageSrc={country.flags.png} imageAlt={country.flags.alt}  name={country.name.common} population={country.population} region={country.region} capital={country.capital} key={i} /> );


    return (
        <div id='cardContainer'>
            {countriesArray}
        </div>
        
    )
}

export default CardList;