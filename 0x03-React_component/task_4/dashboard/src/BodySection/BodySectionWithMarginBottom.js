import React from "react";
import BodySection from "./BodySection";
import "./BodySectionWithMarginBottom.css";
import PropTypes from "prop-types";

class BodySectionWithMarginBottom extends React.Component {
  render() {
    return (
      <div className="BodySectionWithMarginBottom">
        <BodySection {...this.props} />
      </div>
    );
  }
}

BodySectionWithMarginBottom.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default BodySectionWithMarginBottom;
