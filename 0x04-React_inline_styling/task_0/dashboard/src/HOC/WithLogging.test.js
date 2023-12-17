/*
 * @jest-environment jsdom
 */

import React from "react";
import { mount } from "enzyme";
import WithLogging from "./WithLogging";
import Login from "../Login/Login";

describe("Test that our HOC recieves and return enhanced component", () => {
  it("verifies that console.log was calld on mount and unmount, when the wraper component is a pure html", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const HOC = WithLogging(() => <p />);
    const wrapper = mount(<HOC />);

    expect(wrapper.exists()).toBe(true);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('component Component is mounted on componentDidMount()');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith('component Component is going to unmount on componentWillUnmount()');
    consoleSpy.mockRestore();
  });

  it("verify console.log is called with  omponent name on mount and unmount", () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    const HOC = WithLogging(Login);
    const wrapper = mount(<HOC />);

    expect(wrapper.exists()).toBe(true);
    expect(consoleSpy).toHaveBeenCalledTimes(1);
    expect(consoleSpy).toHaveBeenCalledWith('component Login is mounted on componentDidMount()');
    wrapper.unmount();
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith('component Login is going to unmount on componentWillUnmount()');
    jest.restoreAllMocks();
  });

});
