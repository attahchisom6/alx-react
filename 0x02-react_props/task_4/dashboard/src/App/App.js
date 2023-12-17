import React from 'react';
import './App.css';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy } = utils;
import { Notifications } from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';

const App = ({ isLoggedIn }) => {
  return (
    <React.Fragment>
      <Notifications />
      <div className="App">
        <Header />
        { isLoggedIn ? <CourseList /> : <Login /> }
        <Footer />
      </div>
    </React.Fragment>
  );
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
}

App.defaultProps = {
  isLoggedIn: false,
}

export default App;
