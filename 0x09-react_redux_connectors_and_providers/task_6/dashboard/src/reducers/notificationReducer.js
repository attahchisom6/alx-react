import { Map, fromJS } from "immutable";

import {
  FETCH_NOTIFICATIONS_SUCCESS,
  MARK_AS_READ,
  SET_TYPE_FILTER,
  SET_LOADING_STATE,
} from "../actions/notificationActionTypes";

const initialState = Map({
  notifications: {},
  filter: "DEFAULT",
  loading: false,
});

import notifNormalize from "../schema/notifications";

const { notificationsNormalizer } = notifNormalize;

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const normalizedData = notificationsNormalizer(action.data);

      Object.keys(normalizedData.notifications).map((key) => {
        normalizedData.notifications[key].isRead = false;
      });

      return state.mergeDeep(fromJS(normalizedData));

    case MARK_AS_READ:
      return state.setIn(["messages", String(action.index), "isRead"], true);

    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);

    case SET_LOADING_STATE:
      return state.set("loading", action.loading);

    default:
      break;
  }
  return state;
};

export default { notificationReducer, initialState };
