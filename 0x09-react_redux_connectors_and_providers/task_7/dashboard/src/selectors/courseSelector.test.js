/*
 * @jest-environment jsdom
 */

import getArrayOfCourses from "./courseSelector";
import courseState from "../reducers/courseReducer";
import { Map } from "immutable";
import {
  unSelectCourse,
  selectCourse,
  fetchCourseSucess,
} from "../actions/courseActionCreators";

const { courseReducer, initialState } = courseState;

describe("teet the course selectors", () => {
  let state, newState;
  let data, courseReducerSpy;
  beforeEach(() => {
    courseReducerSpy = jest.spyOn(courseState, "courseReducer");
    data = [
      {
        id: 1,
        name: "ES6",
        isSelected: false,
        credit: 60,
      },
      {
        id: 2,
        name: "Webpack",
        isSelected: false,
        credit: 20,
      },
      {
        id: 3,
        name: "React",
        isSelected: false,
        credit: 40,
      },
    ];
  });

  afterEach(() =>  {
    courseReducerSpy.mockRestore();
  });

  it("test that the course selector works as expected", () => {
    const action = fetchCourseSucess(data);
    newState = courseReducer(state=initialState, action);
    newState = { courses: newState };
    const courses = getArrayOfCourses(newState);
    expect(courses.toJS()).toEqual(data);
  });
});
