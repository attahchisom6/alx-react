/*
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Login from '../Login/Login';
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

/*Another Test Approach*/
describe("Test the Login component's functionality", () => {
  it("Test that Login exist and renders without crashing", () => {
    const component = shallow(<Login />);
    expect(component.exists()).toBe(true);
  });

  it("verify the component rensers 3 input tag and two label tag", () => {
    const component = shallow(<Login />);
    expect(component.find("input")).toHaveLength(3);
    expect(component.find("label")).toHaveLength(2);
  });
});

const flushPromises = () => {
  // function to allow simulate to finish resolving
  return new Promise((resolve) => {
    setTimeout(resolve, 0.5);
  });
}

describe("test submit functionality", () => {
  it("verify that the submit button is disabled by default", () => {
    const component = shallow(<Login />);
    const submitButton = component.find("input[type='submit']");
    expect(submitButton.prop("disabled")).toBe(true);
  });

  it("verify that after changing the value of the two inputs, the button is enabled", async () => {
    const component = mount(<Login />);
    let submitButton = component.find("input[type='submit']");
    const emailInput = component.find("input[name='email']");
    const passwordInput = component.find("input[name='password']");

    emailInput.simulate("change", {
      target: {
        type: "email",
        value: "myEmail@code.com",
      }
    });
    expect(submitButton.prop('disabled')).toBe(true);

    passwordInput.simulate("change", {
      target: {
        type: "password",
        value: "codePassword",
      }
    });
    submitButton = component.find("input[type='submit']");
    expect(submitButton.prop("disabled")).toBe(false);
    component.unmount();
  });
});
