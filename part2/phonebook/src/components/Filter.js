const Filter = ( {filter, handleNameFilter} ) => {
    return (
    <div>
      filter shown with <input value={filter} onChange={handleNameFilter}></input>
    </div>)
  }

export default Filter