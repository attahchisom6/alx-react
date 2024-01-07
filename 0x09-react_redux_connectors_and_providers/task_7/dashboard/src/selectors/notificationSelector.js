const filterTypeSelected = (state) => {
  return state.get("filter");

}

const getNotifications = (state) => {
  return state.notifications;
}

const getUnreadNotifications = (state) => {
  const notifications = state.notifications.get("messages");

  const filteredNotif = notifications ? (
    notifications.valueSeq().filter((notif) => !notif.get("isRead"))
  ) : null;
  return filteredNotif;
}

export default {
  filterTypeSelected,
  getNotifications,
  getUnreadNotifications,
};
