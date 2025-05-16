import React, { useState } from "react";
import "./savedCountries.css";


function SavedCountries({ allCountries = [], savedCountries, setSavedCountries }) {
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    name: '',
    email: '',
    country: '',
    bio: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfile(form);
    setForm({ name: '', email: '', country: '', bio: '' });

    // Try to find the country in allCountries by name
const matched = allCountries.find(c => c.name.common.toLowerCase() === form.country.toLowerCase());
if (matched) {
    setSavedCountries((prev) => [...prev, {
    name: matched.name.common,
    flag: matched.flags?.png
    }]);
}
 
  };  

  return (
    <div id="savedCountries">
      <h1>My Profile</h1>
      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={form.name} onChange={handleFormChange} placeholder="Your Name" /><br />
        <input type="text" name="email" value={form.email} onChange={handleFormChange} placeholder="Email" /><br />
        <input type="text" name="country" value={form.country} onChange={handleFormChange} placeholder="Favorite Country" /><br />
        <input type="text" name="bio" value={form.bio} onChange={handleFormChange} placeholder="Bio" /><br />
        <button type="submit">Save Profile</button>
      </form>

      <h2>Saved Countries:</h2>
      <div className="saved-list">
        {savedCountries.map((c, index) => (
          <div key={index} className="saved-country">
            <img src={c.flag} alt={`${c.name} flag`} width="40" />
            <span>{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedCountries;
