import React, { useState } from "react";
import "../../assets/css/weatherCard.css";
import WeatherGraph from "./WeatherGraph";
import { useTranslation } from "react-i18next";

const WeatherCard = ({ location, date, averageTemp, averageTempFeel, averageWind, averageHumidity, averagePressure, weatherText, weatherIcon, weatherTimeLines }) => {
  const { t } = useTranslation();
  const [isZellsium, setIsZellsium] = useState(true)
  return (
    <div className="weather-card">
      <div className="weather-card-header">
        <div className="weather-card-header-title">
          <h4 className="weather-card-header-city">
            {location}
          </h4>
          <p className="weather-card-header-data">
            {date}
          </p>
        </div>
        <div className="weather-card-icon-wrapper">
          <img src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="kek" className="weather-card-icon" />
          <p className="weather-card-state">{weatherText}</p>
        </div>
      </div>
      <WeatherGraph dataDegrees={weatherTimeLines.values} labels={weatherTimeLines.labels} />
      <div className="weather-card-info">
        <div className="weather-card-info-degree">
          <div className="weather-card-info-degree-wrapper">
            <p className="weather-card-info-degree-data">
              +{(isZellsium ? averageTemp : (averageTemp * 1.8 + 32)) | 0}
            </p>
            <div className="weather-card-info-degree-btn-wrapper">
              <button
                className="weather-card-info-degree-btn"
                onClick={()=>setIsZellsium(true)}
              >
                C
              </button>
              <button
                className="weather-card-info-degree-btn"
                onClick={()=>setIsZellsium(false)}
              >
                F
              </button>
            </div>
          </div>
          <p className="weather-card-info-degree-feels">
            Feels like: +{averageTempFeel | 0} C
          </p>
        </div>
        <div className="weather-card-info-other">
          <p className="weather-card-info-other-title">
            {t("wind.1")}:{" "}
            <span className="weather-card-info-other-value">
              {averageWind | 0} m/s
            </span>
          </p>
          <p className="weather-card-info-other-title">
          {t("humidity.1")}:{" "}
            <span className="weather-card-info-other-value">
              {averageHumidity | 0} %
            </span>
          </p>
          <p className="weather-card-info-other-title">
          {t("pressure.1")}:{" "}
            <span className="weather-card-info-other-value">
              {averagePressure | 0} Pa
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default WeatherCard;
