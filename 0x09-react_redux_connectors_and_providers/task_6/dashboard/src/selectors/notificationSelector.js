import { Map } from "immutable";
import notitNormalize from "../schema/notifications";

const { notificationsNormalizer } = notitNormalize;

const filterTypeSelected = (state) => {
  return state.get("filter");

}

const getNotifications = (state) => {
  return state.notifications;
}

const getUnreadNotifications = (state) => {
  /*const notificationObj = state.getIn(["entities", "notifications"]);
  const notificationList = Object.values(notificationObj);
  return notificationList.filter((notif) => !notif.isRead);*/
  // const notifications = state.getIn(["entities", "notifications"]);
  const notifications = state.notifications.get("messages");
  const filteredNotif = notifications ? (
    notifications.valueSeq().filter((notif) => !notif.isRead)
  ) : notifications;
  return filteredNotif;
}

export default {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
}
