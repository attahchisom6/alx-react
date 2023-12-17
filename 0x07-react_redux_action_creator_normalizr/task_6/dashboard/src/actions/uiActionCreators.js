import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
} from "./uiActionTypes";

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

export default {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
};
