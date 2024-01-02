/*
 * @jest-environment jsdom
 */

import { NotificationTypeFilters } from "./notificationActionTypes.js";
import actionCreators from "./notificationActionCreators.js";
import * as notifData from "../../dist/notifications";

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

  jest.mock("node-fetch", () => require("fetch-mock").sandbox());
  const fetchMock = require("node-fetch");
/*import notifData from "../schema/notifications";
const { normalizedData } = notifData;*/

describe("test the filters and notificatiobs actions", () => {
  afterEach(() => {
    fetchMock.restore();
    store.clearActions();
  });

  it("test the markasread action", () => {
    const markAsAreadSpy = jest.spyOn(actionCreators, "markAsAread");
    const expected = {
      type: "MARK_AS_READ",
      index: 1,
    };
    const actual = markAsAreadSpy(1);

    expect(markAsAreadSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
    markAsAreadSpy.mockRestore();
  });

  it("test filter action is setting the right filter state", () => {
    const setNotifSpy = jest.spyOn(actionCreators, "setNotificationFilter");
    const filter = NotificationTypeFilters.DEFAULT;
    const expected = {
      type: "SET_TYPE_FILTER",
      filter: "DEFAULT",
    }
    const actual = setNotifSpy(filter);

    expect(setNotifSpy).toHaveBeenCalled();
    expect(actual).toEqual(expected);
    setNotifSpy.mockRestore();
    jest.restoreAllMocks();
  });

  it("test that setLoadingState create the right action", () => {
    const setLoadingSpy = jest.spyOn(actionCreators, "setLoadingState");
    const actual1 = setLoadingSpy(true);
    const actual2 = setLoadingSpy(false);
    expect(actual1).toEqual({
      type: "SET_LOADING_STATE",
      loading: true,
    });
    expect(actual2).toEqual({
      type: "SET_LOADING_STATE",
      loading: false,
    });
    setLoadingSpy.mockRestore();
  });

  it("verifies that setNotifications creates the right action", () => {
    const setNotifSpy = jest.spyOn(actionCreators, "setNotifications");
    const actual = setNotifSpy(notifData);
    expect(actual).toEqual({
      type: "FETCH_NOTIFICATIONS_SUCCESS",
      data: notifData,
    });
  });

  it("verifies if fetchNotifications returns the desired action", async () => {
    const expectedActions = [
      {type: "SET_LOADING_STATE", loading: true },
      {type: "FETCH_NOTIFICATIONS_SUCCESS", data: notifData},
      {type: "SET_LOADING_STATE", loading: false },
    ];
    fetchMock.mock("http://localhost:7070/notifications.json", {
      body: notifData,
      headers: { "content-type": "application/json" },
    });
    await store.dispatch(actionCreators.fetchNotifications());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
