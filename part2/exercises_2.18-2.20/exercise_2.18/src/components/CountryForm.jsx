import React from "react"

// Filter.js or defined above App
const CountryForm = ({ country,handleCountryChange,getCountry}) => {

  return (
    
      <form onSubmit={getCountry}>
        <div>
      Find countries: <input 
          country='country'
          value={country}
          onChange={handleCountryChange}
          placeholder='Enter A Country'
          /> 
          &nbsp;
          <button type="submit">Find</button>
          </div>
    </form>
    
  );
};   

export default CountryForm