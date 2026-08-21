import React from "react"

// Filter.js or defined above App
const Filter = ({ searchInput,handleSearchInput,searchPhoneBook }) => {

  return (
    <div>
        filter shown with: 
      <input 
      name='search' 
      value = {searchInput}
      onChange = {handleSearchInput}
      placeholder='Search for names'

      />
    </div>
  );
};   

export default Filter