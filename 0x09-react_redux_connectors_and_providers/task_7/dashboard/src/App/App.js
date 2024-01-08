import React from 'react';
import utils from '../utils/utils.js';
const { getFullYear, getFooterCopy, getLatestNotification } = utils;
import ConnectNotifications from '../Notifications/Notifications';
import ConnectHeader from '../Header/Header';
import Login from '../Login/Login';
import ConnectFooter from '../Footer/Footer';
import ConnectCourseList from '../CourseList/CourseList';
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

    this.state = {
      user,
    };
  }

  handleKeyPress(e) {
    if (e.ctrlKey && e.key === "h") {
      alert("Logging you out");
      this.props.logout();
    }
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    const { user } = this.state;
    const {
      displayDrawer,
      isLoggedIn,
      displayNotificationDrawer,
      hideNotificationDrawer,
      login,
    } = this.props;
    return (
      <React.Fragment>
        <div className={ css(styles.App) }>
          <div>
            <ConnectNotifications
              displayDrawer={ displayDrawer }
              handleDisplayDrawer={ displayNotificationDrawer }
              handleHideDrawer={ hideNotificationDrawer }
              />
          </div>
          <div>
            <ConnectHeader displayDrawer={ displayDrawer } />
          </div>
          { isLoggedIn ? (
              <BodySectionWithMarginBottom title="Course list">
                <ConnectCourseList />
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
          <ConnectFooter />
        </div>
      </React.Fragment>
    );
  }

};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.ui.get("isUserLoggedIn"),
    displayDrawer: state.ui.get("isNotificationDrawerVisible"),
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
