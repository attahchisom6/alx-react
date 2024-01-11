import { createSelector } from "reselect";

const filterTypeSelected = (state) => {
  return state.get("filter");

}

const getNotificationsSelector = (state) => {
  return state.notifications;
}

const getUnreadNotificationsByType = createSelector(
  [getNotificationsSelector], (notifications) => {
    const messages = notifications.get("messages");
    const filter = notifications.get("filter");

    if (messages) {
      if (filter === "DEFAULT") {
        return (
          messages.valueSeq().filter((notif) => notif.get("isRead") === false)
        );
      } else {
        return (
          messages.valueSeq().filter((notif) => (notif.get("isRead") === false) && (notif.get("type") === "urgent"))
        );
      }
    }
    return messages;
  }
);

export default {
  filterTypeSelected,
  getNotificationsSelector,
  getUnreadNotificationsByType,
};
