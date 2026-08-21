import Filter from './components/Filter'
import SearchForm from './components/SearchForm'
import SelectedCountryDetails from './components/SelectedCountryDetails'
import CountryList from './components/CountryList'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './css/index.css'
// For Vite
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState([]);
  const [message, setMessage] = useState('');

  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleShowCountry = (country) => {

    setSelectedCountry(country);
      }

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    setSelectedCountry(null);

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
      //setCountries(response.data.countries);
      
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
      <h2>Exercise 2.19*: Data for countries, step 2 </h2>
      <br />
      Find Countries <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a country..."
      />
      
      {/* I need to do a conditional rendering here */}

      { selectedCountry ? (

        <SelectedCountryDetails selectedCountry = {selectedCountry} showCountry = {handleShowCountry} />

      ) : (

        <CountryList countries = {countries} showCountry = {handleShowCountry} />

      )      
      }
      
      
    </div>
  ); 
}

export default App;