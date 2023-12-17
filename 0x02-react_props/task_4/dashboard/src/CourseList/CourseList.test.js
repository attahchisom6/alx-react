import React from 'react';
import { shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow'

describe('test the course list component', () => {
  it("tests the component doeen't crash", () => {
    const component = shallow(<CourseList />);
    expect(component).toBeDefined();
  });

  it("checks that the component renders the 5 eifferent rows", () => {
    const component = shallow(<CourseList />);
    expect(component.find("thead").children()).toHaveLength(2);
    component.find("thead").forEach((child) => {
      expect(child.equals(<CourseListRow textFirstCell="This text" />));
    });

    expect(component.find("tbody").children()).toHaveLength(3);

    component.find("tbody").forEach((child) => {
      expect(child.equals(<CourseListRow textFirstCell="That text" />));
    })
  });

});
