import React from 'react';
import logo from '../assets/holberton-logo.jpg';
import './Footer.css';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy } = utils;

const Footer = () => {
  return (
    <div className="App-footer">
      <p>Copyright { getFullYear() } - { getFooterCopy(true) }</p>
    </div>
  );
}

export default Footer;
