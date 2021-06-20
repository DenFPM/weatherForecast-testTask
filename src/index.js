import React, { Suspense } from "react";
import ReactDOM from 'react-dom';
import './assets/css/reset.css';
import App from './App';
import "./i18next";
import store from "./redux";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading</div>}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);
