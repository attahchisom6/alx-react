/*
 * @jest-environment jsdom
 */

import { Map } from "immutable";
import selectors from "./notificationSelector";
import reduxState from "../reducers/notificationReducer";
import notifiNormalize from "../schema/notifications";
import notif from "../actions/notificationActionCreators";
const {
  markAsAread,
  setNotificationFilter,
  fetchNotificationSuccess,
} = notif;

const { initialState } = reduxState;
const { notificationsNormalizer } = notifiNormalize;

describe("testing selectors", () => {
  let notifReducerSpy;
  let data, state, newState;

  beforeEach(() => {
    notifReducerSpy = jest.spyOn(reduxState, "notificationReducer");
    state = Map({
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
        id: 1,
        type: "default",
        value: "New course available"
      },
      {
        id: 2,
        type: "urgent",
        value: "New resume available"

      },
      {
        id: 3,
        type: "urgent",
        value: "New data available"
      }
    ];
  });

  afterEach(() => {
    notifReducerSpy.mockRestore();
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
    const action = fetchNotificationSuccess(data);
    newState = notifReducerSpy(state=initialState, action);
    const action1 = markAsAread(3);
    newState = notifReducerSpy(state=newState, action1);
    /*expect(JSON.stringify(
      newState.toJS(), null, 2)
    ).toEqual(
       9
    );*/
    const expectedUnReadMsgs = {
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
      ],
    };
    const getUnreadNotificationsSpy = jest.spyOn(selectors, "getUnreadNotifications");
    const unReadMsgs = getUnreadNotificationsSpy(newState);

    expect(getUnreadNotificationsSpy).toHaveBeenCalled();
    expect(getUnreadNotificationsSpy).toHaveBeenCalledWith(newState);
    expect(unReadMsgs).toEqual(expectedUnReadMsgs.notifications);
    getUnreadNotificationsSpy.mockRestore();
  });
});
