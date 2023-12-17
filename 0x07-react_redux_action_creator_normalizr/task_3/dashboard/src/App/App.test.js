/*
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from "enzyme";
import App from "./App.js";
import { Notifications } from "../Notifications/Notifications";
import Header from '../Header/Header';
import  Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import utils from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";

const { getLatestNotification } = utils;

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

const listNotifications = [
  {id: 1, type: "default", value: "1st Notification"},
  {id: 2, type: "urgent", value: "2nd Notification"},
  {id: 3, type: "urgent", html: getLatestNotification()},
];

describe("Test the components of our react app", () => {
  it("test that App renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it('test if our app renders a Notification component', () => {
    const component = shallow(<App />);
    expect(component.find("Notifications").exists()).toBe(true);
  });

  it('verify if our app renders a Header component', () => {
    const component = shallow(<App />);
    expect(component.find("Header").exists()).toBe(true);
  });

  it("verify if the App render a Login component, but not a courseList", () => {
    const component = shallow(<App />);
    expect(component.find("Login").exists()).toBe(true);
    expect(component.find("CourseList").exists()).toBe(false);
  });

  it("verifies that the App renders a CourseList component but not a Login component", () => {
    const component = shallow(<App />);
    component.setState({
      user: {
        isLoggedIn: true,
      },
    });
    expect(component.find("CourseList").exists()).toBe(true);
    expect(component.find("Login").exists()).toBe(false);
  });

  it("verify if the App renders a footer component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Footer />)).toBe(true);
  });

});

describe('when ctrl + h is pressed', () => {
  it('test that the logOut function is called', () => {
    const mockedFn = jest.fn();
    const component = mount(<App />);
    component.setState({
      logOut: mockedFn,
    });
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: "h",
    });
    document.dispatchEvent(event);
    expect(component.exists()).toBe(true);
    expect(mockedFn).toHaveBeenCalled();
    component.unmount();
  });

  document.alert = jest.fn();
  it("verify that alert is called", () => {
    const component = mount(<App />)
    const spy = jest.spyOn(window, "alert");
    const event = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "h",
    });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
    component.unmount();
  });

  it("verifies that alert is called with message 'Logging you out'", () => {
    const component = mount(<App />);
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "h",
    });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith("Logging you out");
    jest.restoreAllMocks();
    component.unmount();
  });
  document.alert.mockClear();
});

describe('testting the working pattern of the state variable in the App component', () => {
  it('tests that the defsult state of displayDrawer is false', () => {
    const component = shallow(<App listNotifications={ [] } />);
    expect(component.state('displayDrawer')).toBe(false);
  });

  it('test that handleDisplayDrawer set the displayDrawer state to true', () => {
    // const handleDisplayDrawer = jest.fn();
    const component = shallow(<App displayDrawer={ false } handleDisplayDrawer={ () => {}} />);
    expect(component.state('displayDrawer')).toBe(false);

    // simulatea call to handleDisplayDraweeeeer
    component.instance().handleDisplayDrawer();
    // expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  expect(component.state('displayDrawer')).toBe(true);
  });

  it('test that handleHideDrawer set the displayDrawer state to false', () => {
    const component = shallow(<App displayDrawer={ false } handleDisplayDrawer={ () => {}} />);
    expect(component.state('displayDrawer')).toBe(false);

    // simulatea call to handleDisplayDraweeeeer
    component.instance().handleDisplayDrawer();
    // expect(handleDisplayDrawer).toHaveBeenCalledTimes(1);
  expect(component.state('displayDrawer')).toBe(true);
    component.instance().handleHideDrawer();
    expect(component.state("displayDrawer")).toBe(false);
  })

  it("erifies that markNotificationAsRead works as intended", () => {
    const component = shallow(<App />);
    const instance = component.instance();
    const spy = jest.spyOn(instance, "markNotificationAsRead");

    component.setState({
      listNotifications: listNotifications,
    });
    instance.markNotificationAsRead(1)
    expect(spy).toHaveBeenCalled();
    expect(component.state("listNotifications")).toEqual(listNotifications.filter((notif) => notif.id !== 1));
    expect(component.state("listNotifications")).toHaveLength(2);
  });
  jest.restoreAllMocks();

});
 
