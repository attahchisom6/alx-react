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

  it("verify that Notifications render 3 list items when displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("NotificationItem")).toHaveLength(3);
  });

  it("verify that Notifications renders the text 'Here is the list of notifications' wen displayDrawer is truw", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("p").at(1).text()).toEqual("Here is the list of notifications");
  });

  it("verifies that the menuItem is being displayed when displayDrawer is false", () => {
    const component = shallow(<Notifications displayDrawer={ false } />);
    expect(component.find("div.menuItem").exists()).toBe(true);
    expect(component.find("div.menuItem").html()).toEqual('<div class="menuItem"><p>Your notifications</p></div>');
  });

  it("verifies that the div.Notifications is not being displayed wen the displayDrawer is false", () => {
    const component = shallow(<Notifications displayDrawer={ false } />);
    expect(component.find("div.Notifications").exists()).toBe(false);
  });

  it("verifies that menuItem is being displayed when displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("div.menuItem").exists()).toBe(true);
    expect(component.find("div.menuItem").html()).toEqual('<div class="menuItem"><p>Your notifications</p></div>');
  });

  it("verifies that the div.Notifications is being displayed wen the displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("div.Notifications").exists()).toBe(true);
  });

});
