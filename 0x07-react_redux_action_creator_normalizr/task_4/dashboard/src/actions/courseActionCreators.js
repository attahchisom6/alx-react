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

export { unSelectCourse, selectCourse };
