import React from "react"

const Persons = ({ searchPhoneBook, onDelete  }) => {
  return (
    
    <ul>
      {searchPhoneBook.map((person) => (
        <li key={person.id}>
          ID: [ {person.id} ] <br />
          Name: {person.name} <br />
          Telephone: {person.number}

          &nbsp; 
          <button onClick={() => onDelete(person.id, person.name)}>
            Delete
          </button>
          
        </li>
        
      ))}
    </ul>
  );
  
};   

export default Persons;