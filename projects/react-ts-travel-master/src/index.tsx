import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import "antd/dist/antd.css";

import './i18n/config'

import { Provider } from 'react-redux'
import rootStore from './redux/store'

import axios from 'axios'
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.headers["x-icode"] = "qKhDxI15yz";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootStore.store}>
      <PersistGate persistor={rootStore.persistor}>
          <App />
        </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
