import React from 'react';
import PropTypes from 'prop-types';

const NotificationItem = ({type, value, html}) => {
  return (
    <React.Fragment>
      { type && value ? <li data-notification-type={ type }>{ value }</li> : null }

      { html ? <li data-urgent dangerouslySetInnerHTML={{ __html: html }}></li> : null }
    </React.Fragment>
  );
}

NotificationItem.propTypes = {
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
}

NotificationItem.defaultProps = {
  type: "default",
}

export default NotificationItem;
