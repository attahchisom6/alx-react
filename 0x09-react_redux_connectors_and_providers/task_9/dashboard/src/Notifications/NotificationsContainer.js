import React, { useEffect } from 'react';
import closeIcon from '../assets/close-icon.png';
import PropTypes from 'prop-types';
import { StyleSheet, css } from "aphrodite";
import { connect } from "react-redux";
import notifActions from "../actions/notificationActionCreators";
import selectors from "../selectors/notificationSelector";
import Notifications from "./Notifications";

const {
  markAsAread,
  fetchNotifications,
  setNotificationFilter,
} = notifActions;
const { getUnreadNotificationsByType } = selectors;

// const NotificationsContainer = (props) => {
class NotificationsContainer extends React.Component {
  /* useEffect(() => {
    props.fetchNotifications();
  }, []); */
  constructor(props) {
    super(props);
  };

  componentDidMount() {
    this.props.fetchNotifications();
  };

  render() {
    return (
      <Notifications {...this.props}></Notifications>
    );
  }
};

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.object,
  handleDisplayDrawer: PropTypes.func,
  handleHideDrawer: PropTypes.func,
  markNotificationAsRead: PropTypes.func,
  fetchNotifications: PropTypes.func,
  setNotificationFilter: PropTypes.func,
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: null,
  handleDisplayDrawer: () => {},
  handleHideDrawer: () => {},
  markNotificationAsRead: () => {},
  fetchNotifications: () => {},
  setNotificationFilter: () => {},
};

const mapStateToProps = (state) => {
  return {
    listNotifications: getUnreadNotificationsByType(state),
  };
};

const mapDispatchToProps = {
  fetchNotifications,
  markNotificationAsRead: markAsAread,
  setNotificationFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsContainer);

export {
  mapStateToProps,
  mapDispatchToProps,
  NotificationsContainer,
};;
