import React from 'react';
import PropTypes from 'prop-types';

class NotificationItem extends React.Component {
  render() {
    const { html, type, value, id, markAsRead } = this.props
    return (
      <React.Fragment>
      { type && value ? <li data-notification-type={ type } onClick={ () => markAsRead(id) } >{ value }</li> : null }

      { html ? <li data-urgent onClick={ () => markAsRead(id) } dangerouslySetInnerHTML={{ __html: html }}></li> : null }
        </React.Fragment>
    );
  }
}


NotificationItem.propTypes = {
  __html: PropTypes.shape({
    html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.number,
}

NotificationItem.defaultProps = {
  type: "default",
  markAsRead: () => {
    console.log("i will mark when callled");
  },
  id: 0,
}

export default NotificationItem;
