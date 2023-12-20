/*
 * @jest-environment jsdom
 */

import { NotificationTypeFilters } from "./notificationActionTypes.js";
import actionCreators from "./notificationActionCreators.js";

describe("test the filters and notificatiobs actions", () => {
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
});
