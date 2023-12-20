import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "./courseActionTypes";

const selectCourse = (index) => {
  return ({
    type: SELECT_COURSE,
    index,
  });
}

const unSelectCourse = (index) => {
  return ({
    type: UNSELECT_COURSE,
    index,
  });
}

const fetchCourseSucess = (data) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    data: data,
  };
};

// binding the action creators
const boundSelectCourse = (index) => dispatch(selectCourse(index));
const boundUnSelectCourse = (index) => dispatch(unSelectCourse(index));

export {
  unSelectCourse,
  selectCourse,
  fetchCourseSucess,
  boundSelectCourse,
  boundUnSelectCourse,
};
