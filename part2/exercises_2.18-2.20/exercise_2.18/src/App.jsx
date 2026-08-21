import Filter from './components/Filter'
import CountryForm from './components/CountryForm'
import Countries from './components/Countries'
import axios from 'axios'
import pbs from './services/phonebook'

import { useState, useEffect } from 'react'
import './css/index.css'
// For Vite
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (!value.trim()) {
      setCountries([]);
      setMessage('');
      return;
    }

    try {
      // Fetch all countries to perform a substring match search
      const response = await fetch(`https://studies.cs.helsinki.fi/restcountries/api/all`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const allCountries = await response.json();
      
      // Filter countries whose common name includes the search term (case-insensitive)
      const filtered = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(value.toLowerCase())
      );

      if (filtered.length > 10) {
        setCountries([]);
        setMessage('Too many matches, please be more specific');
      } else if (filtered.length === 0) {
        setCountries([]);
        setMessage('No countries found');
      } else {
        setCountries(filtered);
        setMessage('');
      }
    } catch (error) {
      setMessage('Error fetching data');
      setCountries([]);
    }
  };

  return (
    <div className='container'>
      <h2>Exercise 2.18* Data for countries, step 1 </h2>
      Find Countries <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country..."
      />
      
      {message && <p>{message}</p>}
      
      {countries.map(country => (
        <>
        <div key={country.cca3 || country.name.common}>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital?.[0] || 'N/A'}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <img src={country.flags.png} alt={`${country.name.common} flag`} width="150" />
        </div>

       
        </>
      ))}
    </div>
  ); 
}

export default App;