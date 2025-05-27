import React, { useEffect, useState } from "react";
import "./savedCountries.css";
import icon from "../assets/x-icon.png"

// On the Saved Countries page, add an “Unsave” button so the user can remove a country from their saved list.
// 2. Add a “Submit again” button to the Form so the user can re-submit if they’d like to.
// UNSAVE FEATURE- when a user clicks the X the country is removed from the saved countries list

function SavedCountries({ allCountries = [], savedCountries, setSavedCountries }) {
//user profile state
  const [profileInfo, setProfileInfo] = useState(null);
// form state
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    bio: ''
  });
// form visibility
const [isVisible, setIsVisible] = useState(true);
  
//logs and displays each key stroke on the form
  const handleFormChange = (e) => {
    const value = e.target.value;
    setForm({ ...form, [e.target.name]: value });
    console.log(form), 'form';
  };
// handling of the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form, 'form data');

// save form data to local storage; applied method to change obj data type to string (json)
    localStorage.setItem('userInfo', JSON.stringify(form));
//updating the state to hold complete form obj (user profile info)
    setProfileInfo(form);
// resetting the form state so that it is clear & ready for new input values
    setForm({
        name: '',
        email: '',
        country: '',
        bio: ''
      });
//Hiding the form
      setIsVisible(false);
  
// Try to find the country in allCountries by name
const matched = allCountries.find(c => c.name.common.toLowerCase() === form.country.toLowerCase());
if (matched) {
    setSavedCountries((prev) => [...prev, {
    name: matched.name.common,
    flag: matched.flags?.png
    }]);
}
  };  

const showForm = () => {
  setIsVisible(true);
};
//on page load I am retrieving 'userInfo' key, parsing it back into a an obj data type, then updating the profileInfo state with that retrieved data
  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    const deserialized = JSON.parse(info);
    console.log(deserialized, 'parsed json for user info')
    setProfileInfo(deserialized);
  }, [])
//on page load I am retrieving the 'savedCountries' key from local storage, parsing the json back to an obj, then updating the savedCountries state to display the saved countries to the user
  useEffect(() => {
    const storedCountries = localStorage.getItem('savedCountries');
    const storedDeserialized = JSON.parse(storedCountries);
    console.log(storedDeserialized, 'parsed json for saved countries')
    setSavedCountries(storedDeserialized);
  }, [])
//filer, update state with filtered info, updated local storage with stringified state
  const handleRemove = (countryName) => {
    const updated = savedCountries.filter(c => c.name !== countryName);
    setSavedCountries(updated);
    localStorage.setItem('savedCountries', JSON.stringify(updated));
  }; 

  return (
    <div id="savedCountries">
    {/* conditional rendering: if the profileInfo state has value and the name key has a value with a character length greater than 0, then display the welcome message w/ users name  */}
    {profileInfo && profileInfo.name.length > 0 ? <h1>Welcome, {profileInfo.name}</h1> : null}
      <h2>My Profile</h2>
      {isVisible ? 
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={form.name} required onChange={handleFormChange} placeholder="Your Name" /><br />
        <input type="text" name="email" value={form.email} onChange={handleFormChange} placeholder="Email" /><br />
        <input type="text" name="country" value={form.country} onChange={handleFormChange} placeholder="Favorite Country" /><br />
        <input type="text" name="bio" value={form.bio} onChange={handleFormChange} placeholder="Bio" /><br />
        <button type="submit" className="profile-submit">Submit</button>
      </form> : <button onClick={showForm}>Show Form</button> }

      <h2>Saved Countries:</h2>
      <div className="saved-list">
      {/* if the savedCountries state has value then iterate over array & display each country to the user */}
        { savedCountries ? savedCountries.map((c, index) => (
          <div key={index} className="saved-country">
            <button onClick={() => handleRemove(c.name)} className="x">❌</button>
            <img src={c.flag} alt={`${c.name} flag`} width="40" className="flagIcon"/>
            <span>{c.name}</span>
          </div>
        )) : null}
      </div>
    </div>
  );
}

export default SavedCountries;
