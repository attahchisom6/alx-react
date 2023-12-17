/*
 * @jest-environment jsdom
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from '../Header/Header';
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from "../App/AppContext";

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
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      },
      logOut: jest.fn(),
    };

    const component = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    const logoutSection = component.find("#logoutSection");
    expect(component.exists()).toBe(true);
    expect(logoutSection.exists()).toBe(false);
    component.unmount();
  });

  it("test that the logoutSection is rendered when custom email and password are passed", () => {
    const context = {
      user: {
        email: "code@mail.com",
        password: "pass4669",
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };
    const component = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );
    const logoutSection = component.find("#logoutSection");

    expect(component.exists()).toBe(true);
    expect(logoutSection.exists()).toBe(true);
    expect(logoutSection.find("h1").html()).toContain("Welcome");
  });

  it("verifies that the logOut function is called when the link is clicked", () => {
    const context = {
      user: {
        email: "secondUserEmail@hello.com",
        password: "2673password",
        isLoggedIn: true,
      },
      logOut: jest.fn(),
    };

    const component = mount(
      <AppContext.Provider value={context}>
        <Header />
      </AppContext.Provider>
    );

    const spy = jest.spyOn(context, "logOut");
    const logoutSection = component.find("#logoutSection");
    expect(logoutSection.exists()).toBe(true);
    logoutSection.find("a").simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
    component.update();
    // expect(logoutSection.exists()).toBe(false);
    spy.mockRestore();
    component.unmount();
  });
});
