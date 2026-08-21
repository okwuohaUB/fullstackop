import React from "react"

const Persons = ({ searchPhoneBook }) => {
  return (
    <ul>
      {searchPhoneBook.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};   

export default Persons;