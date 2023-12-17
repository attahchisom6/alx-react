import React from 'react';
import './Notifications.css';
import closeIcon from './close-icon.png';
import utils from './utils';

const { getLatestNotification } = utils;

export const Notifications = () => {
  return (
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
        <li data-priority="default">New course available</li>
        <li data-priority="urgent">New resume available</li>
        <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
      </ul>
    </div>
  );
}
