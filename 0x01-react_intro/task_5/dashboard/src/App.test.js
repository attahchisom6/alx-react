import React from 'react';
import { shallow } from "enzyme";
import App from "./App";

describe("Test the components of our react app", () => {
  it("test that App renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it('test if our app renders the div App-header', () => {
    const component = shallow(<App />);
    expect(component.find(".App-header")).toBeDefined();
  });

  it('verify if our app renders a div with the class App-body', () => {
    const component = shallow(<App />);
    expect(component.find(".App-body")).toBeDefined();
  });

  it("verify if the App render a div with the class App-footer", () => {
    const component = shallow(<App />);
    expect(component.find(".App-footer")).toBeDefined();
  });

});
