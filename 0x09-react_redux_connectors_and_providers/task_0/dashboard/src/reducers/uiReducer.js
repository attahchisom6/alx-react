import { Map } from "immutable";
import {
  LOGIN,
  LOGOUT,
  DISPLAY_NOTIFICATION_DRAWER,
  HIDE_NOTIFICATION_DRAWER,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
} from "../actions/uiActionTypes";

const initialState = {
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
};

const uiReducer = (state = initialState, action) => {
  const stateMap = Map(state);

  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return stateMap.set("isNotificationDrawerVisible", true);

    case HIDE_NOTIFICATION_DRAWER:
      return stateMap.set("isNotificationDrawerVisible", false);

    case LOGIN_SUCCESS:
      return stateMap.set("isUserLoggedIn", true);

    case LOGOUT:
      return stateMap.set("isUserLoggedIn", false);

    case LOGIN_FAILURE:
      return stateMap.set("isUserLoggedIn", false);

    default:
      return stateMap.toJS();
  };
  return state;
}

export default { uiReducer, initialState };

