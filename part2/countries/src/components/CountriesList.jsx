const CountriesList = ({ countries }) => {
  //
  if (countries === null) {
    //
    return <p>Enter the name of a country.</p>;
  } else if (countries.length > 1 && countries.length <= 10) {
    //
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.common}>{country.name.common}</li>
        ))}
      </ul>
    );
  } else if (countries.length > 10) {
    //
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length === 1) {
    //
    const { name, capital, area, languages, flags } = countries[0];

    return (
      <div>
        <h1>{name?.common}</h1>
        <p>Capital: {capital}</p>
        <p>Area: {area}</p>
        <hr />
        <h2>Languages</h2>
        <ul>
          {Object.values(languages || {}).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img
          src={flags?.png}
          alt={`${name?.common} flag`}
          style={{ border: "1px solid black" }}
        />
      </div>
    );
  } else {
    //
    return <p>No countries found.</p>;
  }
};

export default CountriesList;
