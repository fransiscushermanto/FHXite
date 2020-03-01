import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";

import App from "./components/asset/App";
import reducers from "./reducers";
import * as serviceWorker from "./serviceWorker";
import "./components/asset/css/Client/style.css";
import "./components/asset/css/Client/responsive.css";

const jwtToken = localStorage.getItem("JWT_TOKEN");

ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuthenticated: jwtToken ? true : false
        }
      },
      applyMiddleware(reduxThunk)
    )}
  >
    <Router>
      <App></App>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
