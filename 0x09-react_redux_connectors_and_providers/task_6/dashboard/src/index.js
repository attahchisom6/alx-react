import React from "react";
import ReactDOM from "react-dom";
import ConnectApp from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxRootState from "./reducers/rootReducer";
import { Map } from "immutable";
import thunk from "redux-thunk";
//import { composeWithDevTools } from "redux-devtools-extension";
import { compose, combineReducers } from "redux";

const enhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const { rootReducer, initialRootState } = reduxRootState;
const store = createStore(
  combineReducers(rootReducer),
  initialRootState,
  enhancer(
  applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <ConnectApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
