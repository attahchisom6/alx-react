import React from 'react';
import './Notifications.css';
import closeIcon from '../assets/close-icon.png';
import utils from '../utils/utils.js';
import NotificationItem from './NotificationItem';
import PropTypes from 'prop-types';

const { getLatestNotification } = utils;

export const Notifications = ({ displayDrawer }) => {
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
	          onClick={console.log('Close button has been clicked') }>
	          <img src={ closeIcon } style={{ width:"20px", height:"20px" }} alt="close"></img>
              </button>
                <p>Here is the list of notifications</p>
              <ul>
                <NotificationItem type="default" value="New course available" />
                <NotificationItem type="urgent" value="New resume available" />
                <NotificationItem html={ getLatestNotification() } />
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
  )
}

Notifications.propTypes = {
  displayDrawer: PropTypes.bool,
}

Notifications.defaultProps = {
  displayDrawer: true,
}
