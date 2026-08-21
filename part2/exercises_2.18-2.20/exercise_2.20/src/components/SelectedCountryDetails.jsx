import React from "react";

import { useState, useEffect } from "react";

const SelectedCountryDetails = ({ selectedCountry }) => {
  
  const [weather, setWeather] = useState(null);
  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_KEY;

  useEffect (() => {
    if (!selectedCountry) return;

    const lat = selectedCountry.latlng ? selectedCountry.latlng[0] : selectedCountry.capitalInfo?.latlng?.[0];
    const lon = selectedCountry.latlng ? selectedCountry.latlng[1] : selectedCountry.capitalInfo?.latlng?.[1];

    if (!lat || !lon ) return;

    const fetchWeatherData = async() => {

      try {

        const response =  await fetch (
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const data = await response.json();
        setWeather(data);        

      } catch (error) {

        console.log("There was an error fetching weather data.", error);
        
      }
    }

    fetchWeatherData();
  
  }, [selectedCountry])

  if (!selectedCountry) return null;

  return (

    <div>

      <h2> { selectedCountry.name.common } </h2>
      
      { /* Example: Display Capital */ }

      {selectedCountry.capital && (
        <p> Capital : {selectedCountry.capital[0]}</p>
      )}

      { /* Display Details of the selected country */ }

      <p> Area : {selectedCountry.area} km²</p>

      <p> Region : {selectedCountry.region} </p>

      <p> Subregion : {selectedCountry.subregion} </p>

      <p> Population : {selectedCountry.population} </p>

      GEOLOCATION INFO: 

      <p>
        Latitude : { selectedCountry.latlng[0] } <br />

        Longitude : { selectedCountry.latlng[1] }
      </p>

      Language(s)

      {/* Example: Display Languages (often an object) */}
      {selectedCountry.languages && (
        <ul>
          {Object.values(selectedCountry.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      )}

      <p> <img src={ selectedCountry.flags.png } /> </p>
      
      {/* Example: Display Borders (often an array of codes) */}
      {selectedCountry.borders && selectedCountry.borders.length > 0 && (
        <p>Borders: {selectedCountry.borders.join(', ')}</p>
      )}
      
        { weather ? (
        <div>
         <h2> Weather In {selectedCountry.capital}</h2>
         <p> Temperature : {weather.main.temp} °C</p>
         <p> Wind Speed: {weather.wind.speed} m/s</p>
         <p>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt={weather.weather[0].description} 
        />       
      </p>
      <p> Description: { weather.weather[0].description } </p>

      </div>
        ) : (

          <div>
            Loading.... Data
          </div>

        )
      }
      
    </div>
);

};   

export default SelectedCountryDetails;