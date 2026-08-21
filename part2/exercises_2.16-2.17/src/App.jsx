import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import pbs from './services/phonebook'
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import './css/index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchInput, setSearchInput] = useState('')

  const [successMessage, setSuccessMessage] = useState("successfull...")
  const [errorMessage, setErrorMessage] = useState('some error happened....')

  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  // Helper to show notification
  const showNotification = (msg, type, duration = 5000) => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
      setMessageType(null)
    }, duration)
  }

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

    const personExist = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

    const personObject = {
    name: newName,
    number: newNumber,
    id: Date.now()
  };

  
    if (personExist) {
    // Ask for confirmation
    if (window.confirm(`${newName} is already added to the phonebook, do you want to replace the old number with a new one?`)) {
      // Use PUT to update
      pbs.update(personExist.id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.id !== personExist.id ? p : returnedPerson))
          
          // Set success message and trigger timer
    
          showNotification(`Updated ${returnedPerson.name}'s number`, 'success')
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
         
          setPersons(persons.filter(p => p.id !== personExist.id))
          showNotification(`Information of ${returnedPerson.name} has already been removed from server`, 'error')
        })
    }
  }else{

    // Send data to backend instead of local state update    
    pbs
      .create(personObject)
      .then(returnedPerson => {
        // Update state with the object returned from server (includes ID)
        setPersons(persons.concat(returnedPerson))
         // Set success message and trigger timer setSuccessMessage(`Added ${newName} successfully!`)
          showNotification(`Added ${returnedPerson.name}'s number`, 'success')
          setNewName('')
          setNewNumber('')
      })
      .catch(error => {
        // Handle errors (e.g., validation errors from backend)
        setErrorMessage(error.response.data.error)      
});}
};

 //Change Handlers
const handleNameChange = (e) => setNewName(e.target.value)
const handleNumberChange = (e) => setNewNumber(e.target.value)
const handleSearchInput = (e)=> setSearchInput(e.target.value)

const searchPhoneBook = persons.filter(person => 

  person.name.toLowerCase().includes(searchInput.toLowerCase())
);

  // Delete handler
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      pbs
        .remove(id)
        .then(() => {        
        setPersons(persons.filter(person => person.id !== id))        
        //setErrorMessage(`${name} removed successfully`)
        showNotification(`Updated ${returnedPerson.name}'s removed successfully`, 'success')
        
        })

        .catch(error => {
          console.error(`Error deleting person ${id}:`, error)
          //alert(`Person '${name}' was already deleted from server`)
          setErrorMessage(`Person '${name}' was already deleted from server`)  
          setPersons(persons.filter(person => person.id !== id))
          
        });
    }
  }
  
  return (
    <div>
      <h2>My Phonebook</h2>

      <Notification message={message} type={messageType} />

      <br />
      
      <Filter search={searchInput} handleSearchInput = {handleSearchInput} />
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