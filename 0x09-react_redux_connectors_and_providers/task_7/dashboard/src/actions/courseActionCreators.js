import {
  SELECT_COURSE,
  UNSELECT_COURSE,
  FETCH_COURSE_SUCCESS,
} from "./courseActionTypes";
import /*fetch from*/ "node-fetch"

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

const setCourses = (data) => {
  return {
    type: FETCH_COURSE_SUCCESS,
    data: data,
  };
};

const fetchCourses = () => {
  const thunkAsync = async (dispatch) => {
    return fetch("http://localhost:7070/courses.json")
      .then((response) => response.json())
      .then((data) => dispatch(setCourses(data)))
      .catch(() => {});
  };
  return thunkAsync;
};


export {
  unSelectCourse,
  selectCourse,
  fetchCourseSucess,
  fetchCourses,
  setCourses,
  boundSelectCourse,
  boundUnSelectCourse,
};
