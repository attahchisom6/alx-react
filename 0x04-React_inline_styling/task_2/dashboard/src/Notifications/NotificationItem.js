import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from "aphrodite";

class NotificationItem extends React.PureComponent {
  render() {
    const { html, type, value, id, markAsRead } = this.props
    return (
      <React.Fragment>
      { type && value ?
        <li
          data-notification-type={ type }
          onClick={ () => markAsRead(id) }
          className={ type === "default" ? css(styles.Default) : css(styles.Urgent) }
        >
            { value }
        </li> : null }

      { html ? <li
          data-urgent
          onClick={ () => markAsRead(id) }
          dangerouslySetInnerHTML={{ __html: html }}
          className={ css(styles.Urgent) }>
          </li> : null }
        </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  Default: {
    color: "blue",
  },

  Urgent: {
    color: "red",
  },
});


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
