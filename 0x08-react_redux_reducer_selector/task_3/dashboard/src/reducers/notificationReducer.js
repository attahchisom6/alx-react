export {
  MARK_AS_READ,
  SET_TYPE_FILTER,
  FETCH_NOTIFICATIONS_SUCCESS,
  NotificationTypeFilters,
} from "../actions/notificationActionTypes.js";

const initialState = {
  notifications: [],
  filter: NotificationTypeFilters.DEFAULT,
};

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.data.map((obj) => ({
          ...obj,
          isRead: false,
        });
      }

    case MARK_AS_READ:
      return {
        ...state,
        notifications: state.map((obj) =>
          obj.id === action.index ?
            { ...obj, isRead: true} : obj;
        ),
      };

    case SET_TYPE_FILTER:
      return {
        ...state,
        filter: action.filter,
      };

    default:
      return state;
  };
};
