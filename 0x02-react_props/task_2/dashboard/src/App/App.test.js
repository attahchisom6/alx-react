import React from 'react';
import { shallow } from "enzyme";
import App from "./App.js";
import { Notifications } from "../Notifications/Notifications";
import Header from '../Header/Header';
import  Login from '../Login/Login';
import Footer from '../Footer/Footer';

describe("Test the components of our react app", () => {
  it("test that App renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it('test if our app renders a Notification component', () => {
    const component = shallow(<App />);
    expect(component.contains(<Notifications />)).toBe(true);
  });

  it('verify if our app renders a Header component', () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe(true);
  });

  it("verify if the App render a Login component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Login />)).toBe(true);
  });

  it("verify if the App renders a footer component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Footer />)).toBe(true);
  });

});
