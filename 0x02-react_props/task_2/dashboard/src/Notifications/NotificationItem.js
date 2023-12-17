import React from 'react';
// import './Notifications.css';

const NotificationItem = ({type, value, html}) => {
  return (
    <React.Fragment>
      { type && value ? <li data-notification-type={ type }>{ value }</li> : null }

      { html ? <li data-urgent dangerouslySetInnerHTML={{ __html: html }}></li> : null }
    </React.Fragment>
  );
}

export default NotificationItem;
