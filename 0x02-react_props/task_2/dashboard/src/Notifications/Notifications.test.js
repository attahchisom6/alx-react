import React from  'react';
import { shallow } from 'enzyme';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';

describe('Test the Notification component', () => {
  it("Test that Notifications render without crashing", () => {
    const component = shallow(<Notifications />);
    expect(component).toBeDefined();
  });
  
  it("test if Notification renders ul", () => {
    const component = shallow(<Notifications />);
    expect(component.find("ul")).toBeDefined();
  });

  it("verify that Notifications render 3 list items", () => {
    const component = shallow(<Notifications />);
    expect(component.find("NotificationItem")).toHaveLength(3);
  });

  it("verify that Notifications renders the text 'Here is the list of notifications'", () => {
    const component = shallow(<Notifications />);
    expect(component.find("p").text()).toBe("Here is the list of notifications");
  });
});
