const initState = {
  selectedCities: [],
  citiesData: [],
  isDataLoading: false
};

const weatherData = (state = initState, action) => {
  switch (action.type) {
    case "SET_CITIES_DATA":
      return {
        ...state,
        citiesData: action.payload
      };

    case "SET_LOADED":
      return {
        ...state,
        isDataLoading: action.payload,
      };

    case "SET_SELECTED_CITIES":
      return {
        ...state,
        selectedCities: action.payload,
      };

    default:
      return state;
  }
};
export default weatherData;
