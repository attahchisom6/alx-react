/*
 * @jest-environment jsdom
 */

import { Map } from "immutable";
import {
  unSelectCourse,
  selectCourse,
} from "../actions/courseActionCreators";
import disp from "../actions/uiActionCreators";
import reduxState from "./uiReducer";

const { displayNotificationDrawer } = disp;
const { initialState } = reduxState;

describe("it tests our uiReducer", () => {
  let uiReducerSpy;
  let state

  beforeEach(() => {
    state = initialState;
    uiReducerSpy = jest.spyOn(reduxState, "uiReducer");
  });

  afterEach(() => {
    uiReducerSpy.mockRestore();
  });

  it("verifies that when no action is passed, the stata returned is the initial state", () => {
    const newState = uiReducerSpy(state, {});
    expect(uiReducerSpy).toHaveBeenCalledTimes(1);
    expect(uiReducerSpy).toHaveBeenCalledWith(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it("verifies that uiReducer returns initial with the action type SELECT_COURSR", () => {
    const action = selectCourse(3);
    const newState = uiReducerSpy(state, action);

    expect(uiReducerSpy).toHaveBeenCalled();
    expect(uiReducerSpy).toHaveBeenCalledWith(initialState, action);
    expect(newState).toEqual(initialState);
  });

  it("verifies that uiReducer sets isNotificationDrawerVisible: to true with the action type DISPLAY_NOTIFICATION_DRAWER", () => {
    const action = displayNotificationDrawer();
    const newState = uiReducerSpy(state, action);

    expect(uiReducerSpy).toHaveBeenCalled();
    expect(uiReducerSpy).toHaveBeenCalledWith(initialState, action);
    expect(newState.toJS()).toEqual({
      ...state.toJS(),
      isNotificationDrawerVisible: true,
    });
    expect(newState.get("isNotificationDrawerVisible")).toEqual(true);
    jest.restoreAllMocks();
  });

  it("verifies that uiReducer sets isNotificationDrawerVisible: to true with the action type DISPLAY_NOTIFICATION_DRAWER", () => {
    const [email, password] = ["test@test.com", "password1234"];
    const action = disp.login(email, password);
    const newState = uiReducerSpy(state, action);

    expect(uiReducerSpy).toHaveBeenCalled();
    expect(uiReducerSpy).toHaveBeenCalledWith(initialState, action);
    expect(newState.toJS()).toEqual({
      ...state.toJS(),
      user: {
        ...state.toJS().user,
        email,
        password,
      },
      isUserLoggedIn: true,
    });
    expect(newState.getIn(["user", "email"])).toEqual(email);
    expect(newState.getIn(["user", "password"])).toEqual(password);
    expect(newState.get("isUserLoggedIn")).toEqual(true);
    jest.restoreAllMocks();
  });
});
