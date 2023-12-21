import React from "react";
import BodySection from "./BodySection";
import PropTypes from "prop-types";
import { css, StyleSheet } from "aphrodite";

class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <div className={ css(styles.BodySectionWithMarginBottom) }>
        <BodySection {...this.props} />
      </div>
    );
  }
}

const styles = StyleSheet.create({
  BodySectionWithMarginBottom: {
    marginBottom: "40px",
  },
});

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default BodySectionWithMarginBottom;
