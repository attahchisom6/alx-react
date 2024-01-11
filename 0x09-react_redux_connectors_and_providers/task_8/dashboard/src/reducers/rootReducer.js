import cReducer from "./courseReducer";
import notifReducer from "./notificationReducer";
import UIReducer from "./uiReducer";


const { courseReducer, initialState: initialCourseState } = cReducer;
const { notificationReducer, initialState: initialNotifState } = notifReducer;
const { uiReducer, initialState: initialUiState } = UIReducer;


const initialRootState = {
  courses: initialCourseState,
  notifications: initialNotifState,
  ui: initialUiState,
}

const rootReducer = {
  courses: courseReducer,
  notifications: notificationReducer,
  ui: uiReducer,
};

export default { rootReducer, initialRootState };
