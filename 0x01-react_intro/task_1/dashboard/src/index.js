import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Notifications } from './Notifications';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const NotifId = document.getElementById("root-notifications");
const rootNotif = ReactDOM.createRoot(NotifId);
rootNotif.render (
  <React.StrictMode>
    <Notifications />
  </React.StrictMode>
);

reportWebVitals();
