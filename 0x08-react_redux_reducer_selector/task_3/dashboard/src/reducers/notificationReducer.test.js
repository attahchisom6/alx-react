/*
 * @jest-environment jsdom
 */

import {
  markAsAread,
  setNotificationFilter,
  fetchNotificationSuccess,
} from "../actions/notificationActionCreators";
import reduxState from "./notificationReducer";


const { initialState } = reduxState;

describe("it tests our courseReducer", () => {
  let courseReducerSpy;
  let state, data, newState;

  beforeEach(() => {
    state = initialState;
    courseReducerSpy = jest.spyOn(reduxState, "courseReducer");
    data =  [
      {
        id: 1,
        name: "ES6",
        credit: 60
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20
      },
      {
        id: 3,
        name: "React",
        credit: 40
      },
    ];
  });

  afterEach(() => {
    courseReducerSpy.mockRestore();
  });

  it("verifies that default state returns an empty array", () => {
    newState = courseReducerSpy(state, {});
    expect(courseReducerSpy).toHaveBeenCalledTimes(1);
    expect(courseReducerSpy).toHaveBeenCalledWith(initialState, {});
    expect(initialState).toEqual([]);
    expect(newState).toEqual(initialState);
  });

  it("verifies that FETCH_COURSE_ACTION action returns the data passed", () => {
    const action = fetchCourseSucess(data);
    const newDataFromAction = action.data;

    expect(newDataFromAction).toEqual(data);
  });

  it("verifies that FETCH_COURSE_SUCCESS reducer returns the data with additional attribute", () => {
    const action = fetchCourseSucess(data);
    newState = courseReducerSpy(state, action);
    // Data = newState;
    const expectedState = [
      {
        id: 1,
        name: "ES6",
        credit: 60,
        isSelected: false,
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20,
        isSelected: false,
      },
      {
        id: 3,
        name: "React",
        credit: 40,
        isSelected: false,
      },
    ];

    expect(courseReducerSpy).toHaveBeenCalled();
    expect(courseReducerSpy).toHaveBeenCalledWith(state, action);
    expect(newState).toEqual(expectedState);
    expect(newState.every((course) => course.isSelected === false)).toEqual(true);
  });

  it("verifies that SELECT_COURSE returns the data with the right item updated", () => {
    const action = selectCourse(3);
    newState = courseReducerSpy(state=newState, action);
    const expectedState = [
      {
        id: 1,
        name: "ES6",
        credit: 60,
        isSelected: false,
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20,
        isSelected: false,
      },
      {
        id: 3,
        name: "React",
        credit: 40,
        isSelected: true,
      },
    ];

    expect(courseReducerSpy).toHaveBeenCalled();
    expect(courseReducerSpy).toHaveBeenCalledWith(state, action);
    expect(newState).toEqual(expectedState);
    expect(newState.some((course) => course.isSelected === true)).toEqual(true);
  });

  it("verifies that UNSELECT_COURSE returns the data with the right item updated", () => {
    const action = unSelectCourse(3);
    newState = courseReducerSpy(state=newState, action);
    const expectedState = [
      {
        id: 1,
        name: "ES6",
        credit: 60,
        isSelected: false,
      },
      {
        id: 2,
        name: "Webpack",
        credit: 20,
        isSelected: false,
      },
      {
        id: 3,
        name: "React",
        credit: 40,
        isSelected: false,
      },
    ];

    expect(courseReducerSpy).toHaveBeenCalled();
    expect(courseReducerSpy).toHaveBeenCalledWith(state, action);
    expect(newState).toEqual(expectedState);
    expect(newState.some((course) => course.isSelected === false)).toEqual(true);
  });
});
