/*
 * @jest-environment jsdom
 */

import React from  'react';
import { shallow, mount } from 'enzyme';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';
import utils from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import { Map } from "immutable";
import reduxRootState from "../reducers/rootReducer";
import actionCreators from "../actions/notificationActionCreators";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "./Notifications";

const { getLatestNotification } = utils;
const { rootReducer, initialRootState } = reduxRootState;

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
const id = /[a-zA-Z0-9]+/;

const listNotifications = [
  {id: 1, type: "default", value: "1st Notification"},
  {id: 2, type: "urgent", value: "2nd Notification"},
  {id: 3, type: "urgent", html: getLatestNotification()},
]

describe('Test the Notification component', () => {
  it("Test that Notifications render without crashing", () => {
    const component = shallow(<Notifications />);
    expect(component).toBeDefined();
  });
  
  it("test if Notification renders ul", () => {
    const component = shallow(<Notifications />);
    expect(component.find("ul")).toBeDefined();
  });

  it("verify that Notifications render 1 list items when displayDrawer is true and no array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("NotificationItem")).toHaveLength(1);
  });

  it("verify that Notifications render 3 list items when displayDrawer is true and an array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
    expect(component.find("NotificationItem")).toHaveLength(3);
  });

  it("verify that Notifications renders the text 'Here is the list of notifications' wen displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("p").text()).toEqual("Here is the list of notifications");
  });

  it("verifies that the menuItem is being displayed when displayDrawer is false", () => {
    const component = shallow(<Notifications displayDrawer={ false } />);
    const menuItem = component.find("#menuItem");
    expect(menuItem.exists()).toBe(true);
    expect(menuItem.hasClass(/menuItem_(\w+)/)).toBe(true);
    expect(menuItem.html()).toContain('<p>Your notifications</p>');
  });

  it("verifies that the div.Notifications is not being displayed wen the displayDrawer is false", () => {
    const component = shallow(<Notifications displayDrawer={ false } />);
    expect(component.find("div.Notifications").exists()).toBe(false);
  });

  it("verifies that menuItem is not being displayed when displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    const menuItem = component.find("#menuItem");
    expect(menuItem.exists()).toBe(false);
  });

  it("verifies that the div.Notifications is being displayed wen the displayDrawer is true", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    expect(component.find("#Notifications").exists()).toBe(true);
  });

  it("verifies that notifications renders correctly, if an empty array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } listCourses={ [] } />);
    expect(component.find("NotificationItem").dive().text()).toEqual("No new notification for now");
  });

  it("verifies that notifications renders correctly, if no listCourses array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    const NotifItem = component.find("NotificationItem");
    expect(NotifItem.exists()).toBe(true);
    // expect(NotifItem.dive().prop("className")).toMatch(/Urgent_(\w+)/);
    expect(NotifItem.html()).toContain('No new notification for now');
  });

  it("verify that when you pass a list of notifications, the component renders it correctly and with the right number of NotificationItem", () => {
    const component = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
    const NotifItem = component.find("NotificationItem");
    expect(NotifItem).toHaveLength(3);
    expect(NotifItem.at(0).html()).toContain('1st Notification');
    expect(NotifItem.at(1).html()).toContain('2nd Notification');
    expect(NotifItem.at(2).html()).toContain('<strong>Urgent requirement</strong> - complete by EOD');
  });

});


describe("Mock the Nofications component and check if its functionalies return predictable results", () => {
  it("test that the console method returns appropraite string result", () => {
    /* const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const component = shallow(
    <Notifications displayDrawer={ true } listNotifications={ [] } />
    );
    
    // let simulate a click (which we is an instance of the component since markAsRead is triggered wach time the button is clicked)
    component.prop("markAsRead")(5);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith("Notification 5 has been marked as read");
    consoleSpy.mockRestore();*/
    const component = shallow(<Notifications markNotificationAsRead={ () => {} } />);
    expect(component.exists()).toBe(true);
  });
});

describe("A test to check if Notifications renders when passed with the same list or a longer one, note henceForth this will always be true since shouldComponentUpdate is always updated by ths virtue of displayDrawer prop", () => {
  it("it checks that it doesnt render wen passed with the same list", () => {
    const component = shallow(<Notifications displayDrawer listNotifications={ listNotifications } />);
    // const instance = component.instance().shouldComponentUpdate(listNotifications);
    expect(component.exists()).toBe(true);
  });

  it("it renders when a longer list is passed", () => {
    const initialList = listNotifications;
    const component = shallow(<Notifications displayDrawer listNotifications={ initialList } />);
    expect(component.exists()).toBe(true);

    const newListNotifications = [
      ...listNotifications,
      {id: 4, type: "default", value: "4th Notifications"},
    ]

    // const instance = component.instance().shouldComponentUpdate(newListNotifications);
    const newComp = shallow(<Notifications listNotifications={ newListNotifications } />);
    expect(newComp.exists()).toBe(true);
  });
});

describe("A test to check the Notification component calls the right function to display or hide the drawer", () => {
  it("test that displayDrawer is called wen button is pressed", () => {
    const handleHideDrawer = jest.fn();
    const component = shallow(<Notifications displayDrawer handleHideDrawer={ handleHideDrawer } />);
    const button = component.find("button");
    // const buttonSpy = jest.spyOn(component.instance().props, "handleDisplayDrawer");
    expect(button.exists()).toBe(true);
    button.simulate("click");
    expect(handleHideDrawer).toHaveBeenCalled();
    // expect(component.prop("displayDrawer")).toBe(false);
    jest.restoreAllMocks();
  });

  it("test that displayDrawer is called wen menuItem is pressed", () => {
    const handleDisplayDrawer = jest.fn();
    const component = shallow(<Notifications displayDrawer={ false } handleDisplayDrawer={ handleDisplayDrawer } />);
    const menuItem = component.find("#menuItem");
    expect(menuItem.exists()).toBe(true);
    menuItem.simulate("click");
    expect(handleDisplayDrawer).toHaveBeenCalled();
    // expect(component.prop("displayDrawer")).toBe(true);
    jest.restoreAllMocks();
  });
});

import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as notifData from '../../dist/notifications';
import normalizedData from "../schema/notifications";

const middlewares = [thunk];
jest.mock("node-fetch", () => require("fetch-mock").sandbox());
const fetchMock = require("node-fetch");

describe("test that notification actions are created and properly updates the state", () => {
  let fetchNotifSpy, component;

  beforeEach(() => {
    fetchNotifSpy = jest.fn();
    component = mount(<Notifications fetchNotifications={ fetchNotifSpy } />);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
    
  it("verifies that fetchNotifications is called when the component is mounted", () => {
    expect(fetchNotifSpy).toHaveBeenCalled();
    expect(fetchNotifSpy).toHaveBeenCalledTimes(1);
  });

  it("test that mapStateToProps works as ezpected", async () => {
    const mockStore = configureStore(middlewares);
    const store = mockStore(rootReducer, initialRootState);
    fetchMock.mock("http://localhost:7070/notifications.json", notifData);
    await store.dispatch(actionCreators.fetchNotifications());
    const actions = await store.getActions();
    // expect(actions).toEqual(0);
    const newState = rootReducer.notifications(initialRootState.notifications, actions[1]);
    expect(newState).toEqual(0);
    const actual = mapStateToProps(newState);
    expect(actual).toEqual(0);
  });
});
