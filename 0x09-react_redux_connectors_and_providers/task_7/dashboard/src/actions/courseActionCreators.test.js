import {
  unSelectCourse,
  selectCourse,
  fetchCourses,
  setCourses,
} from "./courseActionCreators";
import * as courseData from "../../dist/courses.json"

describe("test that actionCreator functions create the right action", () => {
  it("create action for course selection", () => {
    const selectAction  = {
      type: "SELECT_COURSE",
      index: 1,
    };
    const actualAction =  selectCourse(1);
    expect(actualAction).toEqual(selectAction);
  });

  it("create action for course unselection", () => {
    const unselectAction  = {
      type: "UNSELECT_COURSE",
      index: 1,
    };
    const actualAction =  unSelectCourse(1);
    expect(actualAction).toEqual(unselectAction);
  });
});

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

jest.mock("node-fetch", () => require("fetch-mock").sandbox());
const fetchMock = require("node-fetch");

describe("test that our api returns the right data", () => {
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });
   it("test that fetchCourses works as expected", async () => {
    const expectedAction = [
      {
        type: "FETCH_COURSE_SUCCESS",
        data: courseData.default,
      },
    ];
    fetchMock.mock("http://localhost:7070/courses.json", {
      body: courseData,
      headers: {"content-type": "application/json"},
    });
    await store.dispatch(fetchCourses());
    const actualAction = store.getActions();
    expect(actualAction).toEqual(expectedAction);
   })
})
