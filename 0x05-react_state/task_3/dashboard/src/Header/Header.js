import React, { useContext } from 'react';
import logo from '../assets/holberton-logo.jpg';
import { StyleSheet, css } from "aphrodite";
import PropTypes from "prop-types";
import { AppContext } from "../App/AppContext";

const Header = ({ displayDrawer }) => {
  const { user, logOut } = useContext(AppContext);
  return (
    <>
      <div className={ displayDrawer ? css(styles.HeaderWithDrawer) : css(styles.HeaderWithoutDrawer) }>
        <img src={ logo } alt="Holberton" className={ css(styles.HeaderIMG) } />
        <h1>School dashboard</h1>
      </div>
      {user.isLoggedIn && (
        <section id="logoutSection" className={ css(styles.Welcome) }>
          <h1>Welcome { user.email }
            <em>
              <a href="#" onClick={ logOut }> (logOut) </a>
            </em>
          </h1>
        </section>
      )}
    </>

  );
}

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
    marginTop: "4px",
  },
});

Header.propTypes = {
  displayDrawer: PropTypes.bool,
}

export default Header;
