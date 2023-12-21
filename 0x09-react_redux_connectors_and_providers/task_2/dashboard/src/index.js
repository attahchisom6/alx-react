import React from "react";
import ReactDOM from "react-dom";
import connectApp from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxState from "./reducers/uiReducer";
import { Map } from "immutable";
import thunk from "redux-thunk";


const { uiReducer, initialState } = reduxS
tate;
const store = createStore(uiReducer, initialState, applyMiddleware(thunk));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={ store }>
      <connectApp />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
