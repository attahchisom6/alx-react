import React from 'react';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy, getLatestNotification } = utils;
import { Notifications } from '../Notifications/Notifications';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Footer from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { css, StyleSheet } from "aphrodite";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.state = {displayDrawer: false};
    this.handleDisplayDrawer = this.handleDisplayDrawer.bind(this);
    this.handleHideDrawer = this.handleHideDrawer.bind(this);
  }

  handleKeyPress(e) {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      this.props.logOut();
    }
  }

  handleDisplayDrawer() {
    return this.setState({
      displayDrawer: true,
    });
  }

  handleHideDrawer() {
    return this.setState({
      displayDrawer: false,
    });
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  listCourses = [
    {
      id: 1,
      name: "ES6",
      credit: 60,
    },
    {
      id: 2,
      name: "Webpack",
      credit: 20,
    },
    {
      id: 3,
      name: "React",
      credit: 40,
    },
  ];

  listNotifications = [
    {
      id: 1,
      type: "default",
      value: "New course available",
    },
    {
      id: 2,
      type: "urgent",
      value: "New resume available",
    },
    {
      id: 3,
      type: "urgent",
      html: getLatestNotification(),
    },
  ];

  render() {
    const { isLoggedIn } = this.props;
    const { displayDrawer } = this.state;
    return (
      <React.Fragment>
        <div className={ css(styles.App) }>
          <Notifications
            listNotifications={ this.listNotifications }
            displayDrawer={ displayDrawer }
            handleDisplayDrawer={ this.handleDisplayDrawer}
            handleHideDrawer={ this.handleHideDrawer}
          />
          <div>
            <Header displayDrawer={ displayDrawer } />
          </div>
          { isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList listCourses={ this.listCourses } />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Log in to continue">
                <Login />
              </BodySectionWithMarginBottom>
            )
          }
          <BodySection title="News from the School">
            <p>Let's Build a great Future
today, even while studying</p>
          </BodySection>
          <Footer />
        </div>
      </React.Fragment>
    );
  }

};

const styles = StyleSheet.create({
  App: {
    maxWidth: "100vw",
    height: "100vh",
    position: "relative",
    fontFamily: "Arial, Helvetica, Sans-serifs",
  },
});

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  logOut: PropTypes.func,
}

App.defaultProps = {
  isLoggedIn: false,
  logOut: () => {
    return;
  },
}

export default App;
