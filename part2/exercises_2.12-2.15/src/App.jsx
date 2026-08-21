import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import pbs from './services/phonebook'
import { useState, useEffect } from 'react'

const App = () => {

  /* A local array to store data
  
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '0908998990', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])*/ 


  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchInput, setSearchInput] = useState('')


   useEffect(() => {
    pbs.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
    .catch(error => {
      console.log('No backend running, using local default data');
      // Optionally set a default local state here if the server fails
    });
  }, [])

  const addNewPerson = (e) => {
    e.preventDefault();
    
    if (!newName) return;

    //const personExist = persons.some(person => person.name.toLowerCase() === newName.toLowerCase());

    const personExist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    const personObject = {
    name: newName,
    number: newNumber,
    id: Date.now()
  };

  //const updateNumber = (personExist.id, newNumber) => {
    if (personExist) {
    // Ask for confirmation
    if (window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)) {
      // Use PUT to update
      pbs.update(personExist.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personExist.id ? p : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          alert(`The person '${newName}' was already removed from server`)
          setPersons(persons.filter(p => p.id !== personExist.id))
        })
    }
  }else{

      // Send data to backend instead of local state update    
    pbs
      .create(personObject)
      .then(returnedPerson => {
        // Update state with the object returned from server (includes ID)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        // Handle errors (e.g., validation errors from backend)
        console.error('Error adding person:', error)
        alert(`Failed to add person: ${error.response?.data?.error || 'Unknown error'}`)
      })

};

    }
      

 //Change Handlers
const handleNameChange = (e) => setNewName(e.target.value)
const handleNumberChange = (e) => setNewNumber(e.target.value)
const handleSearchInput = (e)=> setSearchInput(e.target.value)

const searchPhoneBook = persons.filter(person => 

  person.name.toLowerCase().includes(searchInput.toLowerCase())
)

  // Delete handler
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      pbs
        .remove(id)
        .then(() => {
          //
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          console.error(`Error deleting person ${id}:`, error)
          alert(`Person '${name}' was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>My Phonebook</h2>
      
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
       <Persons 
       searchPhoneBook={searchPhoneBook}
       onDelete={(id, name) => handleDelete(id, name)} 
       />
      </div>
    
    </div>
  )
}

export default App