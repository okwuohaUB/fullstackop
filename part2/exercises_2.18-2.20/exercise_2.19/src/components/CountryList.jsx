import React from "react"


const CountryList = ({countries, showCountry}) => {

  return (
    
    countries.map(country => (
        
        <div key={country.cca3 || country.name.common}>
          <br />
          {country.name.common} 
          &nbsp;  <button onClick ={ () => showCountry(country)}> Show Details </button> <br />
         
        </div>
      ))
    )
}
    
export default CountryList