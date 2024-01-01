import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App/App";
import reduxRootState from "./reducers/rootReducer";

// const store = createStore(
//   uiReducer,
//   Map(initialState),
//   composeWithDevTools(applyMiddleware(thunk))
// );

const { rootReducer, initialRootState } = reduxRootState;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers(rootReducer),
  initialRootState,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
