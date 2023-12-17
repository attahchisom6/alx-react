import React, { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import utils from '../utils/utils.js';
import { css, StyleSheet } from "aphrodite";
import { AppContext } from '../App/AppContext'

const { getFullYear, getFooterCopy } = utils;

const Footer = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className={ css(styles.Footer) }>
        {user.isLoggedIn && (
          <a href="#" className={ css(styles.Contact) } >Contact us</a>
        )}
        <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
      </div>
    </>
  );
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

export default Footer;
