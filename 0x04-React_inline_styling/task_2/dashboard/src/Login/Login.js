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
          <input name="email" type="email"></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password"></input>
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
    border: "4px solid red",
    height: "45%",
  },

  SUBMIT: {
    backgroundColor: "orange",
  },

  input: {
    margin: "3%",
  },
});

export default Login;
