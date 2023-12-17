

import actionCreators from "./uiActionCreators";

/*
 * @jest-environment jsdom
 */

describe("tests the user interface action creators", () => {
  it("test the login function", () => {
    const loginSpy = jest.spyOn(actionCreators, "login");

    const [email, password] = ["test@test.com", "1234"];
    const expected = {
      type: "LOGIN",
      user: {
        email: email,
        password: password,
      },
    };
    const actual = loginSpy(email, password);
    expect(actual).toEqual(expected);
    loginSpy.mockRestore();
  });

  it("test the logout function", () => {
    const logoutSpy = jest.spyOn(actionCreators, "logout");
    const expected = {type: "LOGOUT"};
    const actual = logoutSpy();

    expect(logoutSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
    logoutSpy.mockRestore();
  });

  it("test the displayNotificationDrawer function", () => {
    const displayNotificationDrawerSpy = jest.spyOn(actionCreators, "displayNotificationDrawer");
    const expected = {type: "DISPLAY_NOTIFICATION_DRAWER"};
    const actual = displayNotificationDrawerSpy();

    expect(displayNotificationDrawerSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
    displayNotificationDrawerSpy.mockRestore();
  });

  it("test the logout function", () => {
    const hideNotificationDrawerSpy = jest.spyOn(actionCreators, "hideNotificationDrawer");
    const expected = {type: "HIDE_NOTIFICATION_DRAWER"};
    const actual = hideNotificationDrawerSpy();

    expect(hideNotificationDrawerSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
    hideNotificationDrawerSpy.mockRestore();
    jest.restoreAllMocks();
  });
});



// import fetchMock from "fetch-mock";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";                                                    const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});
/*const fetchMock = require('fetch-mock').sandbox();
const nodeFetch = require('node-fetch');
nodeFetch.default = fetchMock;*/
jest.mock('node-fetch', () => require('fetch-mock').sandbox());
const fetchMock = require('node-fetch');

describe("test the loginRequestAction", () => {
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });

  it("verifies that the Api returns LOGIN AND SUCCESS actions on successful dispatch", async () => {
    const expectedActions = [
      {
        type: "LOGIN",
        user: {
          email: "johann.salva@holberton.nz",
          password: "13345",
        },
      },
      {type: "LOGIN_SUCCESS"},
    ];

    fetchMock.mock("http://localhost:7070/login-success.json", {
      body: {
        "first_name": "Johann",
        "last_name": "Salva",
        "email": "johann.salva@holberton.nz",
          "profile_picture": "http://placehold.it/32x32",
      },
      headers: {"content-type": "application/json"},
    });

    await store.dispatch(actionCreators.loginRequest("johann.salva@holberton.nz", "13345"));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("it test tgar the api returns LOGOUT and LOGIN_FAILURE on a failure", async () => {
    const expectedActions = [
      {
        type: "LOGIN",
        user: {
          email: "johann.salva@holberton.nz",
          password: "13345",
        },
      },
      {type: "LOGIN_FAILURE"},
    ];

    fetchMock.get(
      "http://localhost:7070/login-success.json",
      { throws: new Error("api call failed") },
      { overwriteRoutes: true },
    );
    await store.dispatch(actionCreators.loginRequest("johann.salva@holberton.nz", "13345"));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
