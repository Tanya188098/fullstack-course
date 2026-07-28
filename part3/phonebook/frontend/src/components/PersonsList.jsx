import Person from "./Person";

const PersonsList = ({ filteredPersons, handleDeletePerson }) => {
  return filteredPersons.length > 0 ? (
    filteredPersons.map((person) => (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "10px",
        }}
        key={person.id}
      >
        <Person key={person.id} name={person.name} number={person.number} />
        <button onClick={() => handleDeletePerson(person.id)}>Delete</button>
      </div>
    ))
  ) : (
    <p>No persons found.</p>
  );
};

export default PersonsList;
