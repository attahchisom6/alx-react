/*
 * @jest-environment jsdom
 */

import actionCreators from "./uiActionCreators";
const {
  login,
  logout,
  displayNotificationDrawer,
  hideNotificationDrawer,
} = actionCreators;

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
