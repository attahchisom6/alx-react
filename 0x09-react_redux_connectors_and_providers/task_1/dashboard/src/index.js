import React from "react";
import ReactDOM from "react-dom";
import App from "./App/App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reduxState from "./reducers/uiReducer";
import { Map } from "immutable";

const { uiReducer, initialState } = reduxState;
const store = createStore(uiReducer, initialState);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
