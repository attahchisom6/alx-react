import React from "react";
import ReactDOM from "react-dom";
import ConnectApp from "./App/App";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxState from "./reducers/uiReducer";
import { Map } from "immutable";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


const { uiReducer, initialState } = reduxState;
const store = createStore(
  uiReducer,
  initialState,
  composeWithDevTools(
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
