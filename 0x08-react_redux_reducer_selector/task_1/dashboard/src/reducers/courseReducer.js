import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";

const initialState = [];

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const newState = action.data.map((obj) => {
        return {
          ...obj,
          isSelected: false,
        };
      });
      return newState;

    case SELECT_COURSE:
      return state.map((obj) =>
        obj.id === action.index ?
          { ...obj, isSelected: true, } : obj
      );

    case UNSELECT_COURSE:
      return state.map((obj) =>
        obj.id === action.index ?
          { ...obj, isSelected: false } : obj
      );

    default:
      return state;
  }
};

export default { initialState, courseReducer };
