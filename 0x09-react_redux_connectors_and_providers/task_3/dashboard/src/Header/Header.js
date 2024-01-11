import React, { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { AppContext } from "../App/AppContext";
import { connect } from "react-redux";
import uiActions from "../actions/uiActionCreators";

const { logout } = uiActions;

// const Header = ({ displayDrawer, logout, user }) => {
class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  // const { user } = useContext(AppContext);
  render() {
    const { user, logout, displayDrawer } = this.props;
  return (
    <>
      <div className={ displayDrawer ? css(styles.HeaderWithDrawer) : css(styles.HeaderWithoutDrawer) }>
        <img src={ logo } alt="Holberton" className={ css(styles.HeaderIMG) } />
        <h1>School dashboard</h1>
      </div>
      {user && (
        <section id="logoutSection" className={ css(styles.Welcome) }>
          <h1>Welcome { user.email }
            <em>
              <a href="#" onClick={ logout }> (logOut) </a>
            </em>
          </h1>
        </section>
      )}
    </>

  );
  }
};

Header.contextType = AppContext;

const mapStateToProps = (state) => {
  return {
    user: state.get("user"),
  };
};

const mapDispatchToProps = {
  logout: logout,
};

const styles = StyleSheet.create({
  HeaderWithDrawer: {
    display: "flex",
    alignItems: "center",
    padding: "1.4rem",
    paddingTop: "150px",
    color: "red",
    borderBottom: "4px solid red",
    /*"@media (max-width: 400px)": {
      visibility: "hidden",
    },*/
  },

  HeaderWithoutDrawer: {
      display: "flex",
      alignItems: "center",
      padding: "1.4rem",
      paddingTop: "10px",
      color: "red",
      borderBottom: "4px solid red",
    },

  HeaderIMG: {
    width: "250px",
    height: "250px",
    "@media (max-width: 400px)": {
      maxWidth: "50%",
      height: "50%",
      backgroundSize: "cover",
    },
  },

  Welcome: {
    position: "absolute",
    right: "10px",
    top: "30%",
    "@media (max-width: 400px)": {
      position: "static",
      marginTop: "4px",
      bottom: "0",
    },
  },
});

Header.propTypes = {
  displayDrawer: PropTypes.bool,
  logout: PropTypes.func,
  user: PropTypes.object,
}

Header.defaultProps = {
  user: null,
  logout: () => {},
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
export { Header };
