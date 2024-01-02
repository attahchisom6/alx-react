import React, { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import utils from '../utils/utils.js';
import { css, StyleSheet } from "aphrodite";
import { AppContext } from '../App/AppContext';
import { connect } from "react-redux";

const { getFullYear, getFooterCopy } = utils;
import PropTypes from "prop-types";

const Footer = ({ user }) => {
  // const { user } = useContext(AppContext);
  return (
    <>
      <div className={ css(styles.Footer) }>
        {user && (
          <a href="#" className={ css(styles.Contact) } >Contact us</a>
        )}
        <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.ui.get("user"),
  };
}

const styles = StyleSheet.create({
  Footer: {
    fontSize: "1.4rem",
    fontStyle: "italic",
    padding: "2em",
    alignItems: "center",
    borderTop: "4px solid red",
  },
  Contact: {
    textAlign: "center",
    color: "blue",
    marginBottom: "2px",
  },
});

Footer.propTypes = {
  user: PropTypes.object,
};

Footer.defaultProps = {
  user: null,
};

// note connect from react redux is a HOC i.e it returns a new enhanced component
export default connect(mapStateToProps)(Footer);
export { Footer };
