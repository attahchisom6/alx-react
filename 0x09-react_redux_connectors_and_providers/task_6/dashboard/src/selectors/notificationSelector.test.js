/*
 * @jest-environment jsdom
 */

import { Map, fromJS } from "immutable";
import selectors from "./notificationSelector";
import reduxRootState from "../reducers/rootReducer";
import notifNormalize from "../schema/notifications";
import notif from "../actions/notificationActionCreators";
import { combineReducers } from "redux";

const {
  markAsAread,
  setNotificationFilter,
  setNotifications,
} = notif;

const { initialRootState, rootReducer } = reduxRootState;
const { notificationsNormalizer } = notifNormalize;

describe("testing selectors", () => {
  let rootReducerSpy;
  let data, state, newState;

  beforeEach(() => {
    rootReducerSpy = jest.spyOn(rootReducer, "notifications");
    state = fromJS({
      filter: "URGENT",
      notifications: [
        {
          id: 1,
          isRead: false,
          type: "default",
          value: "New course available"
        },
        {
          id: 2,
          isRead: false,
          type: "urgent",
          value: "New resume available"
        },
        {
          id: 3,
          isRead: false,
          type: "urgent",
          value: "New data available"
        }
      ],
    });
    data = [
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
  });

  afterEach(() => {
    rootReducerSpy.mockRestore();
  });

  it("test that filterTypeSelected works as expected", () => {
    const filterTypeSelectedSpy = jest.spyOn(selectors, "filterTypeSelected");
    const filter = filterTypeSelectedSpy(state);
    expect(filterTypeSelectedSpy).toHaveBeenCalled();
    expect(filterTypeSelectedSpy).toHaveBeenCalledWith(state);
    expect(filter).toEqual("URGENT");
    filterTypeSelectedSpy.mockRestore();
  });

  it("test that getNotifications returns a list of the message entities within the reducer", () => {
    const getNotificationsSpy = jest.spyOn(selectors, "getNotifications");
    const notifications = getNotificationsSpy(state);

    expect(getNotificationsSpy).toHaveBeenCalled();
    expect(getNotificationsSpy).toHaveBeenCalledWith(state);
    expect(state.notifications).toEqual(notifications);
    getNotificationsSpy.mockRestore();
  });

  it("test that getUnreadNotifications return a list of the message entities within the reducer", () => {
    const action = setNotifications(data);
    newState = rootReducerSpy(state=initialRootState.initialNotifState, action);
    newState = { notifications: newState };
    const getUnreadNotificationsSpy = jest.spyOn(selectors, "getUnreadNotifications");
    const unReadMsgs = getUnreadNotificationsSpy(newState);

    expect(getUnreadNotificationsSpy).toHaveBeenCalled();
    expect(getUnreadNotificationsSpy).toHaveBeenCalledWith(newState);
    expect(unReadMsgs.count()).toEqual(2);
    expect(unReadMsgs.valueSeq().every((item) => item.get("isRead") === false)).toBe(true);
    getUnreadNotificationsSpy.mockRestore();
  });
});
