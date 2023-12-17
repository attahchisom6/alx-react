import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../Footer/Footer';
import utils from '../utils/utils';
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
