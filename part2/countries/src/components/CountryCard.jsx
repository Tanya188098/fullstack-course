const CountryCard = ({ country }) => {
  if (!country) return null;

  const { name, capital, area, languages, flags } = country;

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
        style={{ border: "1px solid black", width: "150px" }}
      />
    </div>
  );
};

export default CountryCard;
