import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CountryCardDetail from "../Components/CountryDetailCard";
import "./countryDetail.css";


function CountryDetail ({data, savedCountries, setSavedCountries}) {
    const [country, setCountry] = useState({});
    const { countryName } = useParams();
    useEffect(() => {
      if (data.length > 0 && countryName) {
        const filteredCountry = data.find(
          (country) => country.name.common === countryName
        );
        setCountry(filteredCountry);
      }
    }, [data, countryName]);

    const handleSave = () => {
      if (country) {
        setSavedCountries((prev) => [
          ...prev,
          {
            name: country.name.common,
            flag: country.flags?.png
          }
        ]);
      }
    };
    

  return (
    <div className="country-detail">
      <button onClick={handleSave} className="heart-button">❤️ Save Country</button>
      <CountryCardDetail country={country} allCountries={data} />
    </div>
  );
}

export default CountryDetail;