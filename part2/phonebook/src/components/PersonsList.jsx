import Person from "./Person";

const PersonsList = ({ filteredPersons }) => {
  return filteredPersons.length > 0 ? (
    filteredPersons.map((person) => (
      <Person id={person.id} name={person.name} number={person.number} />
    ))
  ) : (
    <p>No persons found.</p>
  );
};

export default PersonsList;
