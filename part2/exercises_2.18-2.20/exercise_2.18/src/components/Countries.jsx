import React from "react"

const Persons = ({ searchCountry }) => {
  return (
    <ul>
      {searchCountry.map((person) => (

        <li key={person.id}>          
          {person.name} : {person.number}          
        </li>
        
      ))}
    </ul>
  );
};   

export default Persons;