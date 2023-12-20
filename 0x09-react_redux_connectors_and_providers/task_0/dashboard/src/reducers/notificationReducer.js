import { Map } from "immutable";
import {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters,
} from "../actions/notificationActionTypes.js";
import notitNormalize from "../schema/notifications";

const { notificationsNormalizer } = notitNormalize;

const initialState = Map({
  notifications: [],
  filter: NotificationTypeFilters.DEFAULT,
});

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      const notifData = action.data.map((notif) => ({
        id: notif.id,
        type: notif.type,
        isRead: false,
        value: notif.value,
      })
      );
      const normalizedData = notificationsNormalizer(notifData);
      return state.merge(normalizedData);

    case MARK_AS_READ:
      // return state.setIn(["entities", "notifications", action.index.toString(), "isRead"], true);
      return state.setIn(["entities", "notifications", action.index.toString(), "isRead"], true);

    case SET_TYPE_FILTER:
      return state.set("filter", action.filter);

    default:
      return state;
  };
};

export default { notificationReducer, initialState };
