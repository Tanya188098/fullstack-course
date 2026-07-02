import CountryCard from "./CountryCard";

const CountriesList = ({ countries, handleShowDetails }) => {
  //
  if (countries === null) {
    //
    return <p>Enter the name of a country.</p>;
  } else if (countries.length > 1 && countries.length <= 10) {
    //

    return (
      <ul>
        {countries.map((country) => (
          <li key={country?.name?.common} style={{ marginBottom: "10px" }}>
            {country?.name?.common}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => handleShowDetails(country)}
            >
              Show details
            </button>
          </li>
        ))}
      </ul>
    );
  } else if (countries.length > 10) {
    //
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    //

    return <CountryCard country={countries[0]} />;
  } else {
    //
    return <p>No countries found.</p>;
  }
};

export default CountriesList;
