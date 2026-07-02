import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountriesList from "./components/CountriesList";
import CountriesForm from "./components/CountriesForm";
import CountryCard from "./components/CountryCard";

function App() {
  const [countryName, setCountryName] = useState("");
  const [allCountries, setAllCountries] = useState(null);
  const [countryDetails, setCountryDetails] = useState(null);

  // get all countries from the api
  useEffect(() => {
    countryService
      .getAllCountries()
      .then((fetchedCountries) => {
        setAllCountries(fetchedCountries);
      })
      .catch((error) => {
        console.log("Error fetching countries: ", error);
      });
  }, []);

  //
  const handleCountryNameChange = (e) => {
    setCountryName(e.target.value);
    setCountryDetails(null);
  };
  //
  const countriesToShow =
    allCountries && countryName
      ? allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase()),
        )
      : null;

  //
  const handleShowDetails = (country) => {
    console.log(country);
    setCountryDetails(country);
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <CountriesForm
        countryName={countryName}
        handleCountryNameChange={handleCountryNameChange}
      />
      <CountriesList
        countries={countriesToShow}
        handleShowDetails={handleShowDetails}
      />
      {countryDetails && <CountryCard country={countryDetails} />}
    </div>
  );
}

export default App;
