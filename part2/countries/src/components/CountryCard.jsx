import weatherService from "../services/weather";
import { useState, useEffect } from "react";

const CountryCard = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const lat = country?.capitalInfo?.latlng?.[0];
    const lon = country?.capitalInfo?.latlng?.[1];

    if (lat !== undefined && lon !== undefined) {
      weatherService
        .getWeather(lat, lon)
        .then((data) => {
          setWeather(data);
        })
        .catch((error) => console.log("Error fetching weather:", error));
    }
  }, [country]);

  if (!country) return null;

  const { name, capital, area, languages, flags } = country;

  const iconCode = weather?.weather?.[0]?.icon;
  const iconWeather = iconCode ? weatherService.getIcon(iconCode) : null;

  return (
    <div>
      <h1>{name?.common}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <hr />
      <div>
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

      <div>
        <h2>Weather</h2>
        <p>Temperature: {weather?.main?.temp} Celsius</p>
        <p>Wind: {weather?.wind?.speed} m/s</p>
        {iconWeather && (
          <img
            src={iconWeather}
            alt={weather.weather[0]?.description || "weather icon"}
            style={{ border: "1px solid black" }}
          />
        )}
      </div>
    </div>
  );
};

export default CountryCard;
