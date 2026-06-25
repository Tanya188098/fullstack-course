import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  // get persons fron the server
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, []);

  // handler for name input
  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  // handler for number input
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  // handler for add button
  const addName = (e) => {
    e.preventDefault();

    if (
      persons.find(
        (person) => person.name.toLowerCase() === newName.toLowerCase(),
      )
    ) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    const newPerson = {
      id: String(persons.length + 1),
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  // filtering
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <div>
        <h3>Add a new person</h3>
        <PersonForm
          addName={addName}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>

      <div>
        <h2>Numbers</h2>
        <PersonsList filteredPersons={filteredPersons} />
      </div>
    </div>
  );
};

export default App;
