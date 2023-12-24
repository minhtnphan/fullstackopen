const NewPersonForm = ( {addNewPerson, newName, handlePersonInputChange, newNumber, handleNumberInputChange} ) => {
    return (
      <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handlePersonInputChange}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberInputChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
    )
  }
export default NewPersonForm