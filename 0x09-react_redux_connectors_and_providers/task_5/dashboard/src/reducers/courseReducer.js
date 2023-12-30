import { Map } from "immutable";
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
      const courseData = action.data.map((course) => ({
        id: course.id,
        name: course.name,
        isSelected: false,
        credit: course.credit,
      })
      );
      const normalizedData = coursesNormalizer(courseData);
      return state.merge(normalizedData);

    case SELECT_COURSE:
      return state.setIn(["entities", "courses", action.index.toString(), "isSelected"], true);

    case UNSELECT_COURSE:
      return state.setIn(["entities", "courses", action.index.toString(), "isSelected"], false);

    default:
      return state;
  }
};

export default { initialState, courseReducer };
