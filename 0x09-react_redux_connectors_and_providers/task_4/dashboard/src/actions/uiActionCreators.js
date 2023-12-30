import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "./uiActionTypes";
// const fetch = require("node-fetch");
import fetch from "node-fetch";

const login = (email, password) => {
  return {
    type: LOGIN,
    user: {email, password},
  };
};

const logout = () => {
  return {
    type: LOGOUT,
  };
};

const displayNotificationDrawer = () => {
  return {
    type: DISPLAY_NOTIFICATION_DRAWER,
  };
};

const hideNotificationDrawer = () => {
  return {
    type: HIDE_NOTIFICATION_DRAWER,
  };
};

const loginSuccess = () => {
  return {
    type: LOGIN_SUCCESS,
  };
};

const loginFailure = () => {
  return {
    type: LOGIN_FAILURE,
  };
};

const boundLogin = (email, password) => {
  dispatch(login(email, password));
};

const boundLogout = () => {
  dispatch(logout());
}

const boundDisplayNotificationDrawer = () => {
  dispatch(displayNotificationDrawer());
}

const boundHideNotificationDrawer = () => {
  dispatch(hideNotificationDrawer())
}

const loginRequest = (email, password) => {
  const thunkAsync = async (dispatch) => {
    dispatch(login(email, password));
    return fetch("http://localhost:7070/login-success.json")
      .then((data) => data.json())
      .then(() => dispatch(loginSuccess()))
      .catch(() => dispatch(loginFailure()));
  }
  return thunkAsync;
}

export default {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
  boundLogin,
  boundLogout,
  boundDisplayNotificationDrawer,
  boundHideNotificationDrawer,
  loginRequest,
};
