/*
 * @jest-environment jsdom
 */

import { Map } from "immutable";
import notif from "../actions/notificationActionCreators";
const{
  markAsAread,
  setNotificationFilter,
  fetchNotificationSuccess,
} = notif;
import reduxState from "./notificationReducer";
import notifiNormalizer from "../schema/notifications";


const { notificationsNormalizer } = notifiNormalizer;
const { initialState } = reduxState;

describe("it tests our notificationReducer", () => {
  let notifReducerSpy;
  let state, data, newState;

  beforeEach(() => {
    state = initialState;
    notifReducerSpy = jest.spyOn(reduxState, "notificationReducer");
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

  it("verifies that default state returns initialState", () => {
    newState = notifReducerSpy(state, {});
    expect(notifReducerSpy).toHaveBeenCalledTimes(1);
    expect(notifReducerSpy).toHaveBeenCalledWith(initialState, {});
    expect(newState).toEqual(initialState);
  });

  it("verifies that FETCH_NOTIFICATION_ACTION action returns the data passed", () => {
    const action = fetchNotificationSuccess(data);

    const newDataFromAction = action.data;

    expect(newDataFromAction).toEqual(data);
  });

  it("verifies that FETCH_NOTIFICATION_SUCCESS reducer returns the data with additional attribute", () => {
    const action = fetchNotificationSuccess(data);
    newState = notifReducerSpy(state, action);

    const expectedState = Map(notificationsNormalizer({
      filter: "DEFAULT",
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
    }));

    expect(notifReducerSpy).toHaveBeenCalled();
    expect(notifReducerSpy).toHaveBeenCalledWith(state, action);
    expect(newState.notifications).toEqual(expectedState.notifications);
    // expect(newState.notifications.every((notification) => notification.isRead === false)).toEqual(true);
  });

  it("verifies that MARK_AS_READ returns the data with the right item updated", () => {
    const action = markAsAread(3);
    newState = notifReducerSpy(state=newState, action);
    const expectedState = Map(notificationsNormalizer({
      filter: "DEFAULT",
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
          isRead: true,
          type: "urgent",
          value: "New data available"
        }
      ],
    }));

    expect(notifReducerSpy).toHaveBeenCalled();
    expect(notifReducerSpy).toHaveBeenCalledWith(state, action);
    expect(newState.notifications).toEqual(expectedState.notifications);
    // expect(newState.notifications.some((notification) => notification.isRead === true)).toEqual(true);
  });

  it("verifies that  SET_TYPE_FILTER actions returns the data with the filter  item updated", () => {
    const action1 = fetchNotificationSuccess(data);
    newState = notifReducerSpy(state, action1);

    // update filter status of the newState
    const filter = "URGENT";
    const action2 = setNotificationFilter(filter);
    newState = notifReducerSpy(state=newState, action2);
    const expectedState = Map(notificationsNormalizer({
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
    }));

    expect(notifReducerSpy).toHaveBeenCalled();
    expect(notifReducerSpy).toHaveBeenCalledWith(state, action2);
    expect(newState.filter).toEqual(expectedState.filter);
    expect(newState.get("filter")).toEqual("URGENT");
  });
});
