import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from "aphrodite";

class NotificationItem extends React.PureComponent {
  render() {
    const { html, type, value, id, markAsRead } = this.props;
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
    "@media (max-width: 400px)": {
      borderBottom: "2px solid black",
      fontSize: "20px",
      listStyle: "none",
      padding: "10px 8px",
    },
  },

  Urgent: {
    color: "red",
    "@media (max-width: 400px)": {
      borderBottom: "2px solid black",
      fontSize: "20px",
      listStyle: "none",
      padding: "10px 8px",
    },
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
