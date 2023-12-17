import React from "react";
import CourseListRow from './CourseListRow';
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
const id = /[a-zA-Z0-9]+/;

describe("Test the course list Component", () => {
  it("tests the Component soes not crash", () => {
    const component = shallow(<CourseListRow textFirstCell="textFirstCell" />)
    expect(component).toBeDefined();
  });

  it("tests if the component renders one cell with colSpan=2 when textSecondCell=null", () => {
    const component = shallow(<CourseListRow isHeader={true} textFirstCell="Some text" textSecondCell={null} />);
    expect(component.find("tr").children("th")).toHaveLength(1);
    expect(component.find("tr").childAt(0).html()).toEqual('<th colSpan="2">Some text</th>')
  });

  it("verifies that the component renders two cells when textSecondCell is not null", () => {
    const component = shallow(<CourseListRow isHeader={ true } textFirstCell="th ist text" textSecondCell="th 2nd text" />);
    expect(component.find("tr").childAt(0).html()).toEqual('<th>th ist text</th>');
    expect(component.find("tr").childAt(1).html()).toEqual('<th>th 2nd text</th>');
  });

  it("verifies that the component renders two td element when header is false", () => {
    const component = shallow(<CourseListRow isHeader={ false} textFirstCell="td 1st text" textSecondCell="td 2nd text" />);
    expect(component.find("tr").children("td")).toHaveLength(2);
    expect(component.find("tr").childAt(0).html()).toEqual('<td>td 1st text</td>');
    expect(component.find("tr").childAt(1).html()).toEqual('<td>td 2nd text</td>');

  })

})
