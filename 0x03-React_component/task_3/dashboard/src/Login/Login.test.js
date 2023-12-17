import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login/Login';

/*Another Test Approach*/
describe("Test the Login component's functionality", () => {
  it("Test that Login exist and renders without crashing", () => {
    const component = shallow(<Login />);
    expect(component.exists()).toBe(true);
  });

  it("verify the component rensers two input tag and two label tag", () => {
    const component = shallow(<Login />);
    expect(component.find("input")).toHaveLength(2);
    expect(component.find("label")).toHaveLength(2);
  });

});
