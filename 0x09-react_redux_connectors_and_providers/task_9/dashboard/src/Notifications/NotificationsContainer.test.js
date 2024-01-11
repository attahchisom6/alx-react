import React from "react";
import { NotificationsContainer } from "./NotificationsContainer";
import { shallow, mount } from "enzyme";

describe("test fetchNotifications is called mount", () => {
  let fetchNotifSpy, component;

  beforeEach(() => {
    fetchNotifSpy = jest.fn();
    component = shallow(<NotificationsContainer fetchNotifications={ fetchNotifSpy } />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("verifies that fetchNotifications is called when the component is mounted", () => {
    expect(fetchNotifSpy).toHaveBeenCalled();
    expect(fetchNotifSpy).toHaveBeenCalledTimes(1);
  });
});
