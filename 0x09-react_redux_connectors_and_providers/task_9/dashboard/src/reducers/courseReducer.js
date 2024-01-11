import { Map, fromJS } from "immutable";
import {
  FETCH_COURSE_SUCCESS,
  SELECT_COURSE,
  UNSELECT_COURSE,
} from "../actions/courseActionTypes";
import coursesNormalizer from "../schema/courses";

const initialState = Map([]);

const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      const normalizedData = coursesNormalizer(action.data);
      Object.keys(normalizedData).map((key) => {
        return normalizedData[key].isSelected = false;
      });
      return state.merge(normalizedData);

    case SELECT_COURSE:
      return state.setIn([action.index.toString(), "isSelected"], true);

    case UNSELECT_COURSE:
      return state.setIn([action.index.toString(), "isSelected"], false);

    default:
      return state;
  }
};

export default { initialState, courseReducer };
