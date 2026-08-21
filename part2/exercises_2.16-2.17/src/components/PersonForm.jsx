import React from "react"

// Filter.js or defined above App
const PersonForm = ({ newName,handleNameChange, newNumber,handleNumberChange, addNewPerson}) => {

  return (
    
      <form onSubmit={addNewPerson}>
        <div>
      Name: <input 
          name='newName'
          value={newName}
          onChange={handleNameChange}
          placeholder='Enter A Name'
          /> 
          <br />

          Phone : <input 
          name='newnumber'
          value={newNumber}
          onChange={handleNumberChange}
          placeholder='Enter Your Phone Number'
          />    
          <br /><br />
          <button type="submit">add</button>
          </div>
    </form>
    
  );
};   

export default PersonForm