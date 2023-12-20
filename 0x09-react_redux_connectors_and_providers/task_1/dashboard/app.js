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
import { AppContext, user } from "./AppContext";
import { connect } from "react-redux";
import uiActions from "../actions/uiActionCreators";

const {
  hideNotificationDrawer,
  displayNotificationDrawer,
} = uiActions;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.logIn = this.logIn.bind(this);
    this.logOut = this.logOut.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.state = {
      displayDrawer: false,
      user: user,
      logOut: this.logOut,
      listNotifications: [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: getLatestNotification() },
  ],
    };
  }

  handleKeyPress(e) {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      this.state.logOut();
    }
  }

  logIn(email, password) {
    return this.setState({
      user: {
        email: email,
        password: password,
        isLoggedIn: true,
      },
    });
  }

  logOut() {
    return this.setState({
      user: user,
    });
  }

  markNotificationAsRead(id) {
    return this.setState({
      listNotifications: this.state.listNotifications.filter(notification => notification.id !== id)
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

  render() {
    const { user, listNotifications } = this.state;
    const {
      displayDrawer,
      isLoggedIn,
      displayNotificationDrawer,
      hideNotificationDrawer,
    } = this.props;
    return (
      <AppContext.Provider
        value={{
            user: this.state.user,
            logOut: this.state.logOut,
        }}>
        <React.Fragment>
          <div className={ css(styles.App) }>
            <Notifications
              listNotifications={ listNotifications }
              displayDrawer={ displayDrawer }
              handleDisplayDrawer={ hideNotificationDrawer }
              handleHideDrawer={ hideNotificationDrawer }
              markNotificationAsRead={ this.markNotificationAsRead }
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
                  <Login logIn={ this.logIn } />
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
      </AppContext.Provider>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.get("isUserLoggedIn"),
    displayDrawer: state.get("isNotificationDrawerVisible"),
  };
}

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
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
  displayDrawer: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
}

App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {
  App,
  mapStateToProps,
  mapDispatchToProps,
}
