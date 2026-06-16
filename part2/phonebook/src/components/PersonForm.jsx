const PersonForm = ({
  addName,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addName}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <div>
          <label htmlFor="name">Name: </label>
          <input name="name" value={newName} onChange={handleNameChange} />
        </div>

        <div>
          <label htmlFor="number">Number: </label>
          <input
            name="number"
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
      </div>
      <div>
        <button type="submit">Add Person</button>
      </div>
    </form>
  );
};

export default PersonForm;
