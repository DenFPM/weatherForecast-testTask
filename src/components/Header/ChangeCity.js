import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useTranslation } from "react-i18next";
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSelector } from 'react-redux';

const ChangeCity = ({ handleAddCity, onOpenExistCityAlert }) => {
  const { t } = useTranslation();
  const { isDataLoading, selectedCities } = useSelector(({ weatherData }) => weatherData);
  const [currentCity, setCurrentCity] = useState('')
  const handleOptionChange = (name) =>{
    setCurrentCity(name)
    return name;
  }
  return (
    <div className="handler-city-wrapper">
      <Autocomplete
        id="combo-box-demo"
        options={t("cities", { returnObjects: true })}
        getOptionLabel={(option) => handleOptionChange(option.name)}
        style={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label={t("cityName.1")} variant="outlined" />
        )}
      />
      <button
        className="add-btn"
        onClick={() => {
          if(selectedCities.includes(currentCity) || isDataLoading) {
            onOpenExistCityAlert()
            return
          }
          handleAddCity(currentCity)
        }}
      >
        {isDataLoading ? <CircularProgress color={'primary'} style={{padding: '9px'}}/> : t("add.1")}
      </button>
    </div>
  );
};

export default ChangeCity;
