import React from "react";

const DisplayPeople = ({ persons, filter, handleDeleteContact }) => {
  const filteredElements = Object.values(persons)
    .filter((person) => person.name.includes(filter))
    .map((person) => (
      <div key={person.name}>
        {person.name} {person.number}{" "}
        <input
          type="button"
          value="delete"
          id={person.id}
          onClick={handleDeleteContact}
        />
      </div>
    ));

  return filteredElements
};

export default DisplayPeople;