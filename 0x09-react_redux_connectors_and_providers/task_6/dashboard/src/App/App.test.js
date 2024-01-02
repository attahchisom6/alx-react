/*
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from "enzyme";
import connectApp, {
  App,
  mapStateToProps,
  mapDispatchToProps,
}  from "./App.js";
import ConnectNotifications from "../Notifications/Notifications";
import ConnectHeader from '../Header/Header';
import  Login from '../Login/Login';
import ConnectFooter from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import utils from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import app from "./App";
import { Map } from "immutable";

const { getLatestNotification } = utils;
// const { App } = connectApp;

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
    expect(component.find(ConnectNotifications).exists()).toBe(true);
  });

  it('verify if our app renders a Header component', () => {
    const component = shallow(<App />);
    expect(component.find(ConnectHeader).exists()).toBe(true);
  });

  it("verify if the App render a Login component, but not a courseList", () => {
    const component = shallow(<App />);
    expect(component.find("Login").exists()).toBe(true);
    expect(component.find("CourseList").exists()).toBe(false);
  });

  it("verifies that the App renders a CourseList component but not a Login component", () => {
    const component = shallow(<App isLoggedIn={ true } />);
    expect(component.find("CourseList").exists()).toBe(true);
    expect(component.find("Login").exists()).toBe(false);
  });

  it("verify if the App renders a footer component", () => {
    const component = shallow(<App />);
    expect(component.find(ConnectFooter).exists()).toBe(true);
  });

});

describe('when ctrl + h is pressed', () => {
  it('test that the logOut function is called', () => {
    const mockedFn = jest.fn();
    const component = shallow(<App logout={ mockedFn } />);
    const event = new KeyboardEvent('keydown', {
      ctrlKey: true,
      key: "h",
    });
    document.dispatchEvent(event);
    expect(component.exists()).toBe(true);
    expect(mockedFn).toHaveBeenCalled();
  });

  document.alert = jest.fn();
  it("verify that alert is called", () => {
    const component = shallow(<App />)
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
    const component = shallow(<App />);
    const spy = jest.spyOn(window, 'alert');
    const event = new KeyboardEvent("keydown", {
      ctrlKey: true,
      key: "h",
    });
    document.dispatchEvent(event);
    expect(spy).toHaveBeenCalledWith("Logging you out");
    jest.restoreAllMocks();
  });
  document.alert.mockClear();
});

describe('testting the working pattern of the state variable in the App component', () => {
  it('tests that the defsult state of displayDrawer is false', () => {
    const component = shallow(<App listNotifications={ [] } displayDrawer={ false } />);
    expect(component.find("Login").exists()).toBe(true);
  });
});

  // Ui action test has checked this
  /*it('test that handleDisplayDrawer set the displayDrawer state to true', () => {
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
  });
})*/

describe("This will test our connector funcion", () => {
  it("it test that the connector returns the right object from the state", () => {
    const state1 = {
      ui: Map({
        isUserLoggedIn: true,
      }),
    };

    const state2 = {
      ui: Map({
        isNotificationDrawerVisible: true,
      }),
    };

    const state3 = {
      ui: Map({
        isNotificationDrawerVisible: false,
      }),
    };

    const actual1 = mapStateToProps(state1);
    const actual2 = mapStateToProps(state2);
    const actual3 = mapStateToProps(state3)
    expect(actual1).toEqual({
      isLoggedIn: true,
    });
    expect(actual2).toEqual({
      displayDrawer: true,
    });
    expect(actual3).toEqual({
      displayDrawer: false,
    });
  });
;});
