import React from "react";

const WithLogging = (WrapperComponent) => {
  // this class contains the logic of the enhanced properties we want to add to wrapperComponent
  class EnhancedComponent extends React.Component {
    getComponentName() {
      return WrapperComponent.displayName || WrapperComponent.name || "Component";
    }

    componentDidMount() {
      console.log(`component ${this.getComponentName()} is mounted on componentDidMount()`);
    }

    componentWillUnmount() {
      console.log(`component ${this.getComponentName()} is going to unmount on componentWillUnmount()`);
    }

    // render the original component and its props
    render() {
      return <WrapperComponent {...this.props} />
    }
  }

  // modify displayName for debugging purposes
  EnhancedComponent.displayName = `WithLogging(${new EnhancedComponent().getComponentName()})`;
  return EnhancedComponent;
}

export default WithLogging;
