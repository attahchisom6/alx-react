import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';

const NotificationItem = React.memo(function NotificationItem({
  id,
  type,
  value,
  html, // Ensure 'html' is passed as a prop
  markAsRead,
}) {
  return (
    <React.Fragment>
      {type && value ? (
        <li
          data-notification-type={type}
          onClick={() => markAsRead(id)}
          className={type === 'default' ? css(styles.Default) : css(styles.Urgent)}
        >
          {value}
        </li>
      ) : null}

      {html ? (
        <li
          data-urgent
          onClick={() => markAsRead(id)}
          dangerouslySetInnerHTML={html}
          className={css(styles.Urgent)}
        ></li>
      ) : null}
    </React.Fragment>
  );
});

const styles = StyleSheet.create({
  Default: {
    color: 'blue',
    ":hover": {
      cusor: "pointer",
    },
    '@media (max-width: 400px)': {
      borderBottom: '2px solid black',
      fontSize: '20px',
      listStyle: 'none',
      padding: '10px 8px',
    },
  },

  Urgent: {
    color: 'red',
    ":hover": {
      cursor: "pointer",
    },
    '@media (max-width: 400px)': {
      borderBottom: '2px solid black',
      fontSize: '20px',
      listStyle: 'none',
      padding: '10px 8px',
    },
  },
});

NotificationItem.propTypes = {
  html: PropTypes.shape({
    html: PropTypes.string,
  }),
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  markAsRead: PropTypes.func,
  id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

NotificationItem.defaultProps = {
  type: 'default',
  html: {},
  markAsRead: () => {
    console.log('I will mark when called');
  },
  id: NaN,
};

export default NotificationItem;
