import { useEffect, useState } from 'react'

import DisplayPeople from './components/DisplayPeople'
import Filter from './components/Filter'
import NewPersonForm from './components/NewPersonForm'


import ContactService from './services/contact'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState('some error happened...')


  useEffect(() => {
    ContactService.getAllContacts().then((response) => {
      setPersons(response);
    });
  }, []);

  const addNewPerson = (event) => {
    event.preventDefault()

    const isNameDuplicated = Object.values(persons).find(
      (person) => person.name.toLowerCase() === newName.toLowerCase())
    
    console.log(isNameDuplicated)
    
    if (isNameDuplicated && isNameDuplicated.number === newNumber) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
      return
    }
    const personObj = {
      name: newName,
      id: isNameDuplicated === undefined ? "": isNameDuplicated.id,
      number: newNumber
    }
    console.log(personObj)
    if (isNameDuplicated) {

      ContactService
      .updateContact(personObj.id, personObj)
      .then(
        () => {
          ContactService.getAllContacts().then((response) => {
            setPersons(response);
          });
        }
      )
      setNewName('')
      setNewNumber('')
    }

    else {

      ContactService
      .createNewContact(personObj)
      .then(() => {
        ContactService.getAllContacts().then((response) => {
          setPersons(response);
        });
      })
      setNewName('')
      setNewNumber('')
    }

  }

  const handlePersonInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setFilter(event.target.value)
  }

  const handleDeleteContact = (event) => {
    event.preventDefault()
    const contactId = event.target.id

    if (window.confirm("Do you want to delete this contact?")) {

      ContactService
      .deleteContact(contactId)
      .then(() => {
        ContactService.getAllContacts().then((response) => {
          setPersons(response);
        });
      }
    )
    }

  }
 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} handleNameFilter={handleNameFilter}></Filter>

      <NewPersonForm 
        addNewPerson = {addNewPerson}
        newName = {newName} 
        handlePersonInputChange = {handlePersonInputChange}
        newNumber = {newNumber}
        handleNumberInputChange = {handleNumberInputChange}
      ></NewPersonForm>

      <h2>Numbers</h2>
      <ul>
         <DisplayPeople persons = {persons} filter = {filter} handleDeleteContact = { handleDeleteContact }></DisplayPeople>
      </ul>
    </div>
  )
}

export default App