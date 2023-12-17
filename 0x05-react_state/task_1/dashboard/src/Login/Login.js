import React, { useState, useEffect } from 'react';
import logo from '../assets/holberton-logo.jpg';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy } = utils;
import { StyleSheet, css } from "aphrodite";

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enableSubmit, setEnableSubmit] = useState(false);

  useEffect(() => {
    if (email && password) {
      setEnableSubmit(true);
    } else {
      if (enableSubmit) {
        setEnableSubmit(false);
      }
    }
  }, [email, password]);

  const  handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  }

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }
  
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  return (
    <React.Fragment>
      <div className={ css(styles.Login) }>
        <p>Login to access the full dashboard</p>
        <form onSubmit={ handleLoginSubmit }>
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            value={ email }
            onChange={ handleChangeEmail }
            className={ css(styles.Input ) }>
          </input>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            value={ password }
            onChange={ handleChangePassword }
            className={ css(styles.Input) }>
          </input>
          <input
            type="submit"
            disabled={ !enableSubmit }
            value="OK"
            className={ css(styles.SUBMIT) }>
          </input>
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
    "@media (max-width: 400px)": {
      margin: "0.3em",
      background: "red",
    },
  },

  Input: {
    margin: "3%",
    cursor: "pointer",
    "@media (max-width: 400px)": {
      width: "80vw",
    },
    height: "2rem",
  },

});

export default Login;
