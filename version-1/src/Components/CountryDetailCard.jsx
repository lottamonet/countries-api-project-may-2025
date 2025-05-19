import React from "react";
import "./CountryCard.css";

function CountryCardDetail({ country, allCountries, handleSave }) {
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
    <div className="detail-card">
      <img src={country.flags?.png} alt={country.flags?.alt || "Flag"}  className='detail-flag'/>
      <div className="detail-infoContainer">
        <p className="detail-name">{country.name.common}</p>
        <button onClick={handleSave} className="heart-button">❤️ Save</button>
        <p className="detail-population">Population: {country.population.toLocaleString()}</p>
        <p className="detail-region">Region: {country.region}</p>
        <p className="detial-capital">Capital: {country.capital?.[0]}</p>
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


