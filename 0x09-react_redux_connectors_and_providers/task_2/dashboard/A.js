import React from 'react';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy, getLatestNotification } = utils;
import { Notifications } from '../Notifications/Notifications';
import { Header } from '../Header/Header';
import Login from '../Login/Login';
import { Footer } from '../Footer/Footer';
import CourseList from '../CourseList/CourseList';
import PropTypes from 'prop-types';
import BodySectionWithMarginBottom from "../BodySection/BodySectionWithMarginBottom";
import BodySection from "../BodySection/BodySection";
import { css, StyleSheet } from "aphrodite";
import { AppContext, user } from "./AppContext";
import { connect } from "react-redux";
import uiActions from "../actions/uiActionCreators";

const {
  login,
  logout,
  loginRequest,
  displayNotificationDrawer,
  hideNotificationDrawer,
} = uiActions;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.markNotificationAsRead = this.markNotificationAsRead.bind(this);

    this.state = {
      user,
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
      this.props.logout();
    }
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
      login,
      logout,
    } = this.props;
    return (
      <React.Fragment>
        <div className={ css(styles.App) }>
          <Notifications
            listNotifications={ listNotifications }
            displayDrawer={ displayDrawer }
            handleDisplayDrawer={ displayNotificationDrawer }
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
                <Login logIn={ login } />
              </BodySectionWithMarginBottom>
            )
          }
          <BodySection title="News from the School">
            <p>Let's Build a great Future today, even while studying</p>
          </BodySection>
          <Footer />
        </div>
      </React.Fragment>
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
  login: loginRequest,
  logout,
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
  login: PropTypes.func,
  logout: PropTypes.func,
}

App.defaultProps = {
  displayDrawer: false,
  isLoggedIn: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
  logout: () => {},
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
export {
  App,
  mapStateToProps,
  mapDispatchToProps,
}
