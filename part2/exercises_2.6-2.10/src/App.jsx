import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '0908998990', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }

   
  ]) 

  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchInput, setSearchInput] = useState('')


  const addNewPerson = (e) => {
    e.preventDefault();
    
    if (!newName) return;

    const personExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    if(personExist){
      alert(`${newName} is already in the phonebook`);
      return
    }


    const personObject = {
    name: newName,
    number: newNumber,
    id: Date.now()
  };


    //setPersons([...newName, persons] );    setPersons([...persons, { name: newName }]);
    
    setPersons(persons.concat(personObject));
    setNewName('');
    setNewNumber('')

};



//Change Handlers
const handleNameChange = (e) => setNewName(e.target.value)
const handleNumberChange = (e) => setNewNumber(e.target.value)
const handleSearchInput = (e)=> setSearchInput(e.target.value)

const searchPhoneBook = persons.filter(person => 

  person.name.toLowerCase().includes(searchInput.toLowerCase())
)

  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter search={searchInput} handleSearchInput = {handleSearchInput}/>
      <br /><br />
      
      <PersonForm 
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addNewPerson={addNewPerson}
      />
      
      <div>

        <h2>Names & Telephone Numbers</h2>

       <Persons searchPhoneBook={searchPhoneBook} />
      </div>
    
    </div>
  )
}

export default App