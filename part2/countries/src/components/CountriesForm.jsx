const CountriesForm = ({ countryName, handleCountryNameChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="countries">Find countries: </label>
        <input
          name="countries"
          value={countryName}
          onChange={handleCountryNameChange}
        />
      </div>
    </form>
  );
};

export default CountriesForm;
