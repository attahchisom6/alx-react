import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import utils from '../utils/utils.js';
import { css, StyleSheet } from "aphrodite";

const { getFullYear, getFooterCopy } = utils;

const Footer = () => {
  return (
    <div className={ css(styles.Footer) }>
      <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
    </div>
  );
}

const styles = StyleSheet.create({
  Footer: {
    fontSize: "1.4rem",
    fontStyle: "italic",
    padding: "2em",
    alignItems: "center",
    borderTop: "4px solid red",
  }
});

export default Footer;
