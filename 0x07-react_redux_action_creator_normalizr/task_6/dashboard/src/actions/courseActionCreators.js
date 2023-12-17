import { SELECT_COURSE, UNSELECT_COURSE } from "./courseActionTypes";

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

// binding the action creators
const boundSelectCourse = (index) => dispatch(selectCourse(index));
const boundUnSelectCourse = (index) => dispatch(unSelectCourse(index));

export {
  unSelectCourse,
  selectCourse,
boundSelectCourse,
boundUnSelectCourse
};