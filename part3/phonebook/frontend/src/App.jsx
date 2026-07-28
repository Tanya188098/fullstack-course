import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import PersonsList from "./components/PersonsList";
import personsService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("");

  // get persons fron the server
  useEffect(() => {
    personsService.getAll().then((initialPerson) => {
      setPersons(initialPerson);
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
  const addPerson = (e) => {
    e.preventDefault();

    if (newName.trim() === "" || newNumber.trim() === "") {
      alert("Please fill the fields.");
      return;
    }

    const existedPerson = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase(),
    );

    if (existedPerson) {
      // Function to clean the number from the space and dash
      const cleanNumber = (num) => num.replace(/[\s-]/g, "");

      const isDifferentNumber =
        cleanNumber(existedPerson.number) !== cleanNumber(newNumber);

      if (isDifferentNumber) {
        const confirmUpdate = window.confirm(
          `${newName} is already added to phonebook with a different number. Do you want to update the number?`,
        );

        if (confirmUpdate) {
          personsService
            .update(existedPerson.id, {
              ...existedPerson,
              number: newNumber,
            })
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id === updatedPerson.id ? updatedPerson : person,
                ),
              );
            })
            .catch(() => {
              // set error message
              setNotificationMessage(
                "The person has already been removed from the server.",
              );
              setNotificationType("error");
            });

          setNewName("");
          setNewNumber("");
        }
      } else {
        alert(
          `${newName} is already added to phonebook with this exact number.`,
        );
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personsService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName("");
          setNewNumber("");
        })
        .catch(() => {
          // set error message
          setNotificationMessage(
            "Sorry, there was an error adding the person.",
          );
          setNotificationType("error");
        });

      // set success message
      setNotificationMessage(`${newName} has been added to the phonebook.`);
      setNotificationType("success");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  // filtering
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  // delete person
  const handleDeletePerson = (id) => {
    const deletedPerson = persons.find((person) => person.id === id);

    if (
      window.confirm(`Are you sure you want to delete ${deletedPerson.name}?`)
    ) {
      personsService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() => {
          // set error message
          setNotificationMessage("Sorry, you cannot delete this person.");
          setNotificationType("error");
        });
    }
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="phonebook">
      <h2>Phonebook</h2>

      <Notification message={notificationMessage} type={notificationType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <div>
        <h3>Add a new person</h3>
        <PersonForm
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newNumber={newNumber}
          handleNumberChange={handleNumberChange}
        />
      </div>

      <div>
        <h2>Numbers</h2>
        <PersonsList
          filteredPersons={filteredPersons}
          handleDeletePerson={handleDeletePerson}
        />
      </div>
    </div>
  );
};

export default App;
