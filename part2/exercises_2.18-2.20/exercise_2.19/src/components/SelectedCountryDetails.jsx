import React from "react"

const SelectedCountryDetails = ({ selectedCountry }) => {
  
  if (!selectedCountry) return null;

  return (

    <div>
      
       <h2>{selectedCountry.name.common}</h2>
      
      {/* Example: Display Capital */}
      {selectedCountry.capital && (
        <p>Capital: {selectedCountry.capital[0]}</p>
      )}

      {/* Example: Display Area */}
      <p>Area: {selectedCountry.area} km²</p>

      <p>Region: {selectedCountry.region} </p>

      <p>Subregion: {selectedCountry.subregion} </p>

      <p>Population: {selectedCountry.population} </p>

      {/* Example: Display Languages (often an object) */}
      {selectedCountry.languages && (
        <ul>
          {Object.values(selectedCountry.languages).map(lang => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
      )}

      <p><img src={selectedCountry.flags.png} /> </p>
      
      {/* Example: Display Borders (often an array of codes) */}
      {selectedCountry.borders && selectedCountry.borders.length > 0 && (
        <p>Borders: {selectedCountry.borders.join(', ')}</p>
      )}
    </div>

  );

};   

export default SelectedCountryDetails;