import React from "react";
import "../../assets/css/header.css";
import { useSelector } from 'react-redux';
import {WeatherCard} from '../WeatherMain';



const WeatherCards = () => {
  const { citiesData } = useSelector(({ weatherData }) => weatherData);
  return (
    <div className="weather-cards-wrapper">
      {
        citiesData.length ?
          (
            citiesData.map(({location, date, averageTemp, averageTempFeel, averageWind, averageHumidity, averagePressure, weatherText, weatherIcon, weatherTimeLines}) =>
              (<WeatherCard
              key={`${location}${averageTemp}${weatherIcon}${averageWind}`}
              location={location}
              date={date}
              averageTemp={averageTemp}
              averageTempFeel={averageTempFeel}
              averageWind={averageWind}
              averageHumidity={averageHumidity}
              averagePressure={averagePressure}
              weatherText={weatherText}
              weatherIcon={weatherIcon}
              weatherTimeLines={weatherTimeLines}
            />))
          )
          :
          <span>Please choose a city.</span>
      }
    </div>
  );
};
export default WeatherCards;
