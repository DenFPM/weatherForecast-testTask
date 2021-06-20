import { combineReducers } from "redux";

import weatherData from "./weatherDataReducer";

const rootReducer = combineReducers({
  weatherData,
});

export default rootReducer;
