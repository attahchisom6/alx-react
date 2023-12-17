import React from 'react';
import { shallow } from 'enzyme';
import Header from '../Header/Header';

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
