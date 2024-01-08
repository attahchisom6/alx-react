/*
* @jest-environment jsdom
*/

import React from 'react';
import { mount, shallow } from 'enzyme';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from "aphrodite";
import * as actionCreators from "../actions/courseActionCreators";

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
const id = /[a-zA-Z0-9]+/;

const listCourses = [
  {id: 1, name: "C", credit: 100},
  {id: 2, name: "javascript", credit: 80},
  {id: 3, name: "react", credit: 90},
]

describe('test the course list component', () => {
  it("tests the component doeen't crash", () => {
    const component = shallow(<CourseList />);
    expect(component).toBeDefined();
  });

  it("checks that the component renders the 5 eifferent rows", () => {
    const component = shallow(<CourseList  listCourses={ listCourses } />);
    expect(component.find("thead").children()).toHaveLength(2);
    component.find("thead").forEach((child) => {
      expect(child.equals(<CourseListRow textFirstCell="This text" />));
    });

    expect(component.find("tbody").children()).toHaveLength(3);

    component.find("tbody").forEach((child) => {
      expect(child.equals(<CourseListRow textFirstCell="That text" />));
    })
  });

  it("verifies that Course list renders correctly if u pass an empty array", () => {
    const component = shallow(<CourseList listCourses={[]} />);
    const row1 = component.find("tbody").childAt(0);
    // expect(row1.hasClass(/rowStyle_(\w*)/)).toBe(true);
    expect(row1.html()).toContain('No course available yet');

  });

  it("verifies that Course list renders correctly when no array was passed", () => {
    const component = shallow(<CourseList />);
    const row0 = component.find("tbody").childAt(0);
    // expect(row0.hasClass(/rowStyle_(\w+)/)).toBe(true);
    expect(row0.html()).toContain('No course available yet');
});

  it("verifiea that CourseList renders correctly wen listCourse array is passed", () => {
    const component = shallow(<CourseList listCourses={ listCourses } isHeader={ false } />);
    expect(component.find("tbody").children()).toHaveLength(3);
    listCourses.forEach((course, index) => {
      expect(component.find("tbody").childAt(index).exists()).toBe(true);
    });
  });
});



describe("verify the anxtions and dispatched actions work as intebded", () => {
  it('verifies that fetchCourses is called when component is mounted', () => {
    // const obj = {fetchCourseKey: fetchCourses };
    const fetchCoursesSpy = jest.spyOn(CourseList.defaultProps, "fetchCourses");
    const component = mount(<CourseList />);
    expect(fetchCoursesSpy).toHaveBeenCalled();
    fetchCoursesSpy.mockRestore();
  });

  it("Verify that the two actions, select and unselect are correctly dispatched when the onChangeRow function is called", () => {
    const selectSpy = jest.spyOn(actionCreators, "selectCourse");
    const unselectSpy = jest.spyOn(actionCreators, "unSelectCourse")
    const component    = shallow(<CourseList listCourses={listCourses}/>);

    const instance = component.instance();
    instance.onChangeRow(1, true);

    expect(selectSpy).toHaveBeenCalled();
    expect(unselectSpy).not.toHaveBeenCalled();

    selectSpy.mockRestore();
    unselectSpy.mockRestore()
  });
});
