import React from "react";
import '../App.css';

function Card({imageSrc, imageAlt, name, population, region, capital}) {

    return (
        <div className="card">
            <img src={imageSrc} alt={imageAlt} className="flag"/>
            <p className="name">{name}</p>
            <div className="infoContainer">
                <p id="population">Population: {population}</p>
                <p id="region">Region: {region}</p>
                <p id="capital">Captital: {capital}</p>
            </div>
        </div>
    )
}

export default Card;