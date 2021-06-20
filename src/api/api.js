import axios from "axios";

export const getWeather = async (city, lang) => axios.get(
  `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${process.env.REACT_APP_WEATHER_APP_ID}&lang=${lang}`
);
export const getWeatherByLoc = async (latitude,longitude, lang) => axios.get(
  `http://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_APP_ID}&lang=${lang}`
);