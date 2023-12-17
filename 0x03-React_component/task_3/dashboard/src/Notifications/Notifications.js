import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import utils from '../utils/utils.js';
import NotificationItem from './NotificationItem';
import NotificationItemShape from './NotificationItemShape';
import PropTypes from 'prop-types';

const { getLatestNotification } = utils;

export const Notifications = class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.markAsRead = this.markAsRead.bind(this);
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { displayDrawer, listNotifications } = this.props;
    return (
      <React.Fragment>
        {
          displayDrawer ? (
            <div className="flexBox">
              <div className="menuItem">
                <p>Your notifications</p>
              </div>
              <div className="Notifications">
                <button style={
                  {
                    color: "green",
                    position: "absolute",
                    background: "none",
                    border: "none",
                    top: "2px",
                    right: "2px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer"
                  }
                }
              aria-label="Close"
	            onClick={() => console.log('Close button has been clicked') }>
	            <img src={ closeIcon } style={{ width:"20px", height:"20px" }} alt="close"></img>
                </button>
                <p>Here is the list of notifications</p>
                <ul>
                  {
                    listNotifications && listNotifications.length > 0 ? (
                      listNotifications.map(({ type, html, value, id, markAsRead }) => (
                        <NotificationItem
                          key={ id }
                          html={ html }
                          type={ type }
                          value={ value }
                          id={ id }
                          markAsRead={ this.markAsRead }
                        />
                      ))
                    ) : (
                      <NotificationItem type="urgent" value="No new notification for now" />
                    )
                  }
                </ul>
              </div>
            </div>
          )
          :
          (
            <div className="menuItem">
              <p>Your notifications</p>
            </div>  
          )
        }
      </React.Fragment>
    );
  }
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
  listNotifications: PropTypes.arrayOf(NotificationItemShape),
}

Notifications.defaultProps = {
  displayDrawer: false,
  listNotifications: [],
}
