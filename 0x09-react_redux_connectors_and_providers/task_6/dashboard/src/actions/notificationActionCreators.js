import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  SET_LOADING_STATE,
} from "./notificationActionTypes.js";
import fetch from "node-fetch";

const markAsAread = (index) => {
  return {
    type: MARK_AS_READ,
    index,
  };
};

const setNotificationFilter = (filter) => {
  return {
    type: SET_TYPE_FILTER,
    filter: filter,
  };
};

const boundMarkAsAread = (index) => {
  dispatch(markAsAread(index));
};

const boundSetNotificationFilter = (filter) => {
  dispatch(setNotificationFilter(filter));
};

const setLoadingState = (loading) => {
  return {
    type: SET_LOADING_STATE,
    loading,
  };
};

const setNotifications = (data) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data,
  };
};

const fetchNotifications = () => {
  const thunkAsync = async (dispatch) => {
    dispatch(setLoadingState(true));
    return fetch("http://localhost:7070/notifications.json")
      .then((data) => data.json())
      .then((resData) => dispatch(setNotifications(resData)))
      .catch(() => {})
      .finally(() => dispatch(setLoadingState(false)));
  }
  return thunkAsync;
}


export default {
  markAsAread,
  setNotificationFilter,
  setLoadingState,
  setNotifications,
  fetchNotifications,
  boundMarkAsAread,
  boundSetNotificationFilter,
};
