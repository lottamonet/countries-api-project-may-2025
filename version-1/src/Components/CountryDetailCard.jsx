import React from "react";
import "./CountryCard.css";

function CountryCardDetail({ country, allCountries }) {
  if (!country || !country.name) {
    return <p>No Country Data Is Available.</p>;
  }

  const borderCountries = country.borders?.map((borderCode) => {
    const match = allCountries.find((c) => c.cca3 === borderCode);
    return match
      ? (
        <div key={borderCode} className="border-country">
          <img
            src={match.flags?.png}
            alt={match.flags?.alt || `${match.name.common} flag`}
            className="small-flag"
          />
          <span>{match.name.common}</span>
        </div>
      )
      : null;
  });


  return (
    <div className="card">
      <img src={country.flags?.png} alt={country.flags?.alt || "Flag"} className="flag" />
      <p className="name">{country.name.common}</p>
      <div className="infoContainer">
        <p id="population">Population: {country.population}</p>
        <p id="region">Region: {country.region}</p>
        <p id="capital">Capital: {country.capital?.[0]}</p>
        {borderCountries && borderCountries.length > 0 && (
          <div id="borderingCountries">
            <p>Bordering Countries:</p>
            <div className="borders-list">
              {borderCountries}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CountryCardDetail;


