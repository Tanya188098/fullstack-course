import axios from "axios";

const getWeather = (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const request = axios.get(url).then((response) => response.data);

  return request;
};

const getIcon = (name) => {
  return `https://openweathermap.org/img/wn/${name}@2x.png`;
};

export default { getWeather, getIcon };
