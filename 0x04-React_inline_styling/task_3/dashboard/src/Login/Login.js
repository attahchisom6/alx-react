import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy } = utils;
import { StyleSheet, css } from "aphrodite";

const Login = () => {
  return (
    <React.Fragment>
      <div className={ css(styles.Login) }>
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email" className={ css(styles.Input) }></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password" className={ css(styles.Input) }></input>
          <button className={ css(styles.SUBMIT) }>Ok</button>
        </form>
      </div>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  Login: {
    padding: "1.2em",
    fontSize: "1.4rem",
    height: "45%",
    "@media (max-width: 900px)": {
      display: "flex",
      flexDirection: "column",
    },
  },

  SUBMIT: {
    backgroundColor: "orange",
    "@media (max-width: 480px)": {
      display: "block",
      margin: "0.3em",
      background: "red",
    },
  },

  Input: {
    margin: "3%",
    cursor: "pointer",
    width: "80vw",
    height: "2rem",
  },

});

export default Login;
