/*
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { Header } from '../Header/Header';
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from "../App/AppContext";
import uiActions from "../actions/uiActionCreators";
const { logout } = uiActions;

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe('test the header component functionality', () => {
  it("test if app doesn't crash", () => {
    const component = shallow(<Header />);
    expect(component).toBeDefined();
  });

  it("test if component renders img and h1 tag", () => {
    const component = shallow(<Header />);
    expect(component.find("img")).toBeDefined();
    expect(component.find("h1")).toBeDefined();
  });

});

describe("test that mounts the Header component with a different context value.", () => {
  it("verify that the logoutSection is not created when mounted with a default context value", () => {
    const user = null /*{
      email: "",
      password: "",
      // isLoggedIn: false,
    }*/;
    const logout = jest.fn();

    const component = shallow(<Header logout={logout} user={ user } />);

    const logoutSection = component.find("#logoutSection");
    expect(component.exists()).toBe(true);
    expect(logoutSection.exists()).toBe(false);
  });

  it("test that the logoutSection is rendered when custom email and password are passed", () => {
    const user =  {
      email: "code@mail.com",
      password: "pass4669",
    }
    const mockLogout = jest.fn();
  const component = shallow(<Header logout={ mockLogout } user={ user } />);
    const logoutSection = component.find("#logoutSection");

    expect(component.exists()).toBe(true);
    expect(logoutSection.exists()).toBe(true);
    expect(logoutSection.find("h1").html()).toContain(`Welcome ${ user.email }`);
  });

  it("verifies that the logOut function is called when the link is clicked", () => {
    const user = {
      email: "secondUserEmail@hello.com",
      password: "2673password",
    };
    const logoutSpy = jest.fn();

    const component = shallow(<Header logout={ logoutSpy } user={ user } />);

    const logoutSection = component.find("#logoutSection");
    expect(logoutSection.exists()).toBe(true);
    logoutSection.find("a").simulate("click");
    expect(logoutSpy).toHaveBeenCalledTimes(1);
    logoutSpy.mockRestore();
  });
});
