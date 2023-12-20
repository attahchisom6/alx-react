import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
} from "./notificationActionTypes.js";

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

const fetchNotificationSuccess = (data) => {
  return {
    type: FETCH_NOTIFICATIONS_SUCCESS,
    data: data,
  };
}

export default {
  markAsAread,
  setNotificationFilter,
  fetchNotificationSuccess,
  boundMarkAsAread,
  boundSetNotificationFilter,
};
