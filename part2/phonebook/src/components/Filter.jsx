const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label htmlFor="filter"> Filter list by name: </label>
      <input name="filter" value={filter} onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;
