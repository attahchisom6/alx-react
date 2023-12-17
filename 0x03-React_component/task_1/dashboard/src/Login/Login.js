import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Login.css';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy } = utils;

const Login = () => {
  return (
    <React.Fragment>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form>
          <label htmlFor="email">Email:</label>
          <input name="email" type="email"></input>
          <label htmlFor="password">Password:</label>
          <input name="password" type="password"></input>
          <button>Ok</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
