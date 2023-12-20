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
  const notificationMap = state.getIn(["entities", "notifications"]);
  const notificationList = Object.values(notificationMap);
  return notificationList.filter((notif) => !notif.isRead);
}

export default {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
}
