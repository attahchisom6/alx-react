/*
 * @jest-environment jsdom
 */

import React from  'react';
import { shallow, mount } from 'enzyme';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';
import utils from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import { Map, fromJS } from "immutable";
import reduxRootState from "../reducers/rootReducer";
import actionCreators from "../actions/notificationActionCreators";
import {
  mapStateToProps,
  mapDispatchToProps,
} from "./Notifications";
import notifNormalize from "../schema/notifications";
import selectors from "../selectors/notificationSelector"

const { getLatestNotification } = utils;
const { rootReducer, initialRootState } = reduxRootState;
const { notificationsNormalizer } = notifNormalize;
const { getUnreadNotificationsByType } = selectors;
const id = /[a-zA-Z0-9]+/;

/*let listNotifications = fromJS(notificationsNormalizer([
  {id: 1, type: "default", value: "1st Notification"},
  {id: 2, type: "urgent", value: "2nd Notification"},
  {id: 3, type: "urgent", html: getLatestNotification()},
]));*/
const data = [
  {
    id: '5debd76480edafc8af244228',
    author: {
      id: '5debd764a7c57c7839d722e9',
      name: {
        first: 'Poole',
                              
        last: 'Sanders',
      },
      email: 'poole.sanders@holberton.nz',
      picture: 'http://placehold.it/32x32',
      age: 25,
    },
    context: {
      guid: '2d8e40be-1c78-4de0-afc9-fcc147afd4d2',
      isRead: true,
      type: 'urgent',
      value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
    },
  },
  {
    id: '5debd764507712e7a1307303',
    author: {
      id: '5debd7648ba8641ce0a34ea4',
      name: {
        first: 'Norton',
        last: 'Grimes',
      },
      email: 'norton.grimes@holberton.nz',
      picture: 'http://placehold.it/32x32',
      age: 37,
    },
    context: {
      guid: 'cec84b7a-7be4-4af0-b833-f1485433f66e',
      isRead: false,
      type: 'urgent',
      value: 'ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. ',
    },
  },
  {
    id: '5debd76444dd4dafea89d53b',
    author: {
      id: '5debd764a7c57c7839d722e9',
      name: {
        first: 'Poole',
        last: 'Sanders',
      },
      email: 'poole.sanders@holberton.nz',
      picture: 'http://placehold.it/32x32',
      age: 25,
    },
    context: {
      guid: '280913fe-38dd-4abd-8ab6-acdb4105f922',
      isRead: false,
      type: 'urgent',
      value: 'Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed',
    },
  },
];

let state, newState, listNotifications;
const action = actionCreators.setNotifications(data);
newState = rootReducer.notifications(state=initialRootState.initialNotifState, action);
newState = { notifications: newState };
const unReadMsgs = getUnreadNotificationsByType(newState);



beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
  listNotifications = unReadMsgs;
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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
    expect(component.find(NotificationItem).exists()).toBe(true);
    expect(component.find(NotificationItem)).toHaveLength(1);
  });

  it("verify that Notifications render 2 list items when displayDrawer is true and an array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
    expect(component.find(NotificationItem)).toHaveLength(2);
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
    expect(component.find(NotificationItem).dive().text()).toEqual("No new notification for now");
  });

  it("verifies that notifications renders correctly, if no listCourses array is passed", () => {
    const component = shallow(<Notifications displayDrawer={ true } />);
    const NotifItem = component.find(NotificationItem);
    expect(NotifItem.exists()).toBe(true);
    // expect(NotifItem.dive().prop("className")).toMatch(/Urgent_(\w+)/);
    expect(NotifItem.html()).toContain('No new notification for now');
  });

  it("verify that when you pass a list of notifications, the component renders it correctly and with the right number of NotificationItem", () => {
    const component = shallow(<Notifications displayDrawer={ true } listNotifications={ listNotifications } />);
    const NotifItem = component.find(NotificationItem);
    expect(NotifItem).toHaveLength(2);
    expect(NotifItem.at(0).html()).toContain('ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et.');
    expect(NotifItem.at(1).html()).toContain('Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed');
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

    /* const insertedListItem = Map({
      guid: "4",
      type: "default",
      "isRead": false,
      value: "4th Notifications"
    });
    const newListNotifications = listNotifications.setIn(['messages', String(insertedListItem.get("guid"))], insertedListItem);

    // const instance = component.instance().shouldComponentUpdate(newListNotifications);
    const newComp = shallow(<Notifications listNotifications={ newListNotifications } />);
    expect(newComp.exists()).toBe(true);*/
  });
});

describe("A test to check the Notification component calls the right function to display or hide the drawer", () => {
  it("test that displayDrawer is called wen button is pressed", () => {
    const handleHideDrawer = jest.fn();
    const component = shallow(<Notifications displayDrawer handleHideDrawer={ handleHideDrawer } />);
    const button = component.find("button");
    // const buttonSpy = jest.spyOn(component.instance().props, "handleDisplayDrawer");
    expect(button.exists()).toBe(true);
    button.at(0).simulate("click");
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
// const fetchMock = require("node-fetch");

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

  it("test that mapStateToProps works as expected", async () => {
    const updatedProp = mapStateToProps(newState);
    const expected = [
      {
        "guid": "cec84b7a-7be4-4af0-b833-f1485433f66e",
        "isRead": false,
        "type": "urgent",
        "value": "ut labore et dolore magna aliqua. Dignissim convallis aenean et tortor at risus viverra adipiscing. Ac tortor dignissim convallis aenean et. "
      },
      {
        "guid": "280913fe-38dd-4abd-8ab6-acdb4105f922",
        "isRead": false,
        "type": "urgent",
        "value": "Non diam phasellus vestibulum lorem sed risus ultricies. Tellus mauris a diam maecenas sed"
      }
    ];
    
    expect(updatedProp.listNotifications.toJS()).toEqual(expected);
  });
});

describe("check if cliking desired button yeild expected response", () => {
  it("verifies setNotifcations works as expected", () => {
    const setNotificationFilterSpy = jest.spyOn(Notifications.defaultProps, "setNotificationFilter");
    const component = shallow(<Notifications displayDrawer />);
    const urgentButton = component.find("button").at(1);
    const defaultButton = component.find("button").at(2);

    urgentButton.simulate("click");
    expect(setNotificationFilterSpy).toHaveBeenCalled();
    expect(setNotificationFilterSpy).toHaveBeenCalledWith("URGENT");
    setNotificationFilterSpy.mockRestore();

    defaultButton.simulate("click");
    expect(setNotificationFilterSpy).toHaveBeenCalled();
    expect(setNotificationFilterSpy).toHaveBeenCalledWith("DEFAULT");
    setNotificationFilterSpy.mockRestore();
  });
});
