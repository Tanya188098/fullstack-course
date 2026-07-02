import { useState, useEffect } from "react";
import countryService from "./services/countries";
import CountriesList from "./components/CountriesList";
import CountriesForm from "./components/CountriesForm";

function App() {
  const [countryName, setCountryName] = useState("");
  const [allCountries, setAllCountries] = useState(null);

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
  };

  //
  const countriesToShow =
    allCountries && countryName
      ? allCountries.filter((country) =>
          country.name.common.toLowerCase().includes(countryName.toLowerCase()),
        )
      : null;

  return (
    <div style={{ marginTop: "50px" }}>
      <CountriesForm
        countryName={countryName}
        handleCountryNameChange={handleCountryNameChange}
      />
      <CountriesList countries={countriesToShow} />
    </div>
  );
}

export default App;
