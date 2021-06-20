import "./assets/css/App.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from './components/Header'
import {WeatherCards} from './components/WeatherMain'
import {getWeather,getWeatherByLoc} from './api'
import Alert from '@material-ui/lab/Alert';
import i18next from 'i18next';
import { setLoaded, setCitiesData, setSelectedCities } from './redux/actions/setWeatherActions'
import { useDispatch, useSelector } from 'react-redux'

const getAverageNumber = (array, type) => {
  switch (type) {
    case 'temp':
      return array.reduce((a, b) => (a + b.main.temp - 273.15), 0) / array.length
    case 'tempFeel':
      return array.reduce((a, b) => (a + b.main.feels_like - 273.15), 0) / array.length
    case 'wind':
      return array.reduce((a, b) => (a + b.wind.speed), 0) / array.length
    case 'humidity':
      return array.reduce((a, b) => (a + b.main.humidity), 0) / array.length
    case 'pressure':
      return array.reduce((a, b) => (a + b.main.pressure), 0) / array.length
    case 'weatherText':
      return array[parseInt(array.length / 2)].weather[0]
  }
}

function App() {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();
  const {  selectedCities } = useSelector(({ weatherData }) => weatherData);

  const [isAlertExistCityActive, setIsAlertExistCityActive] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
   

  useEffect(() => {
    
    if(isFirstRender){
      const selectedCitiesFromLocalStorage =  JSON.parse(localStorage.getItem('selectedCities'))
      console.log(selectedCitiesFromLocalStorage)
      if(selectedCitiesFromLocalStorage !== null && selectedCitiesFromLocalStorage.length){
        dispatch(setSelectedCities(selectedCitiesFromLocalStorage))
      }
      i18next.changeLanguage(localStorage.getItem('lang'))
      setIsFirstRender(false)
    }
    localStorage.setItem('lang', i18n.language)
  }, [i18n.language])

  const handleAddCity = (city) => {
    localStorage.setItem('selectedCities', JSON.stringify([...selectedCities,city]))
    dispatch(setSelectedCities([...selectedCities, city]))
  }

  const onOpenExistCityAlert = () => {
    setIsAlertExistCityActive(true)
    if(!isAlertExistCityActive){
      setTimeout(()=> {
        setIsAlertExistCityActive(false)
      }, 2000)
    }
  }

  const generateWeatherCardData = (data) => {
    const currentDayData = data.list.filter(weatherTimeLine => weatherTimeLine.dt_txt.includes(data.list[0].dt_txt.slice(0, 10)))
    return {
      location: `${data.city.name}, ${data.city.country}`,
      date: new Date(data.list[0].dt_txt).toDateString(),
      averageTemp: getAverageNumber(currentDayData, 'temp'),
      averageTempFeel: getAverageNumber(currentDayData, 'tempFeel'),
      averageWind: getAverageNumber(currentDayData, 'wind'),
      averageHumidity: getAverageNumber(currentDayData, 'humidity'),
      averagePressure: getAverageNumber(currentDayData, 'pressure'),
      weatherText: getAverageNumber(currentDayData, 'weatherText').description,
      weatherIcon: getAverageNumber(currentDayData, 'weatherText').icon,
      weatherTimeLines: {
        labels: currentDayData.map(weatherTimeLine => `${new Date( weatherTimeLine.dt_txt).getHours()}:${new Date( weatherTimeLine.dt_txt).getMinutes()}0`),
        values: currentDayData.map(weatherTimeLine => parseInt(weatherTimeLine.main.temp - 273.15))
      }
    }
  }

  useEffect(()=>{
    (async () => {
      dispatch(setLoaded(true))
      const selectedCitiesFromLocalStorage =  JSON.parse(localStorage.getItem('selectedCities'))
      if(selectedCitiesFromLocalStorage === null || !selectedCitiesFromLocalStorage.length){
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (position)=> {
            const {data} = await getWeatherByLoc(position.coords.latitude,position.coords.longitude, i18n.language)
            localStorage.setItem('selectedCities', JSON.stringify([data.city.name]))
            dispatch(setSelectedCities([data.city.name]))
            dispatch(setCitiesData([generateWeatherCardData(data)]))
            dispatch(setLoaded(false))
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      }
      const citiesTempData = []

      for(let city of selectedCities){
        const { data } = await getWeather(city,i18n.language)
        citiesTempData.push(generateWeatherCardData(data))
      }
      dispatch(setCitiesData(citiesTempData))

      dispatch(setLoaded(false))
    })()
  },[selectedCities, i18n.language])

  return (
    <div className="container">
      <Header handleAddCity={handleAddCity} onOpenExistCityAlert={onOpenExistCityAlert}/>
      {isAlertExistCityActive && <Alert style={{maxWidth: 200}} severity="error">City already added!</Alert>}
      <WeatherCards />
    </div>
  );
}

export default App;
