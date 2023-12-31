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
