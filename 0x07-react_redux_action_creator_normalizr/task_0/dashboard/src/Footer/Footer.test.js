/*                                         * @jest-environment jsdom                 */

import React, { useContext } from 'react';
import { mount, shallow } from 'enzyme';
import Footer from '../Footer/Footer';
import utils from '../utils/utils';
import { StyleSheetTestUtils } from "aphrodite";
import { AppContext } from "../App/AppContext";


beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
const { getFullYear, getFooterCopy } = utils;

describe('Test the Footer component', () => {
  it("test that the component doesn't crash", () => {
    const component = shallow(<Footer />);
    expect(component.exists()).toEqual(true);
  });

  it("verify the component renders at least the text 'Copyright'", () => {
    const component = shallow(<Footer />);
    expect(component.text()).toEqual(`Copyright ${getFullYear()} - ${getFooterCopy(true) }`);
  });
});

describe('test the features of the footer component by passing differentvalues', () => {
  it('verify that the link is not displayed when the user is logged out within the context', () => {
    const context = {
      user: {
        email: "",
        password: "",
        isLoggedIn: false,
      }
    }
    const component = mount(
      <AppContext.Provider value={ context }>
        <Footer />
      </AppContext.Provider>
    );
    const link = component.find("a");
    expect(component).toBeDefined();
    expect(link.exists()).toBe(false);
  });

  it('verify that the link is displayed when the user is logged in within the context', () => {
    const context = {
      user: {
        email: "dev@email.com",
        password: "3457",
        isLoggedIn: true,
      }
    }
    const component = mount(
      <AppContext.Provider value={ context }>
        <Footer />
      </AppContext.Provider>
    );
    const link = component.find("a");
    expect(component).toBeDefined();
    expect(link.exists()).toBe(true);
  });
});
