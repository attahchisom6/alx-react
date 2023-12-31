import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from "aphrodite";

beforeEach(()  => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});
const id = /[a-zA-Z0-9]+/;

describe('test the functionality of the NotificationItem component', () => {
  it('tests that it doesnt crash', () => {
    const component = shallow(<NotificationItem />);
    expect(component.exists()).toBe(true);
  });

  it("it renders correct html for dummy types and values", () => {
    const component = shallow(<NotificationItem />);
    component.setProps({
      type: "default",
      value: "test"
    });
    // expect(component.hasClass(/Default_(\w+)/)).toBe(true);
    expect(component.html()).toContain('test');
  });

  it("test that it renders the correct html by passing the html prop <ul>test</ul>", () => {
    const component = shallow(<NotificationItem />);
    component.setProps({ html: "<ul>test</ul>"})
    expect(component.html()).toContain('test');
  });

});

describe("check if the 0nClick function works accurately", () => {
  it("verify that the console method is calleed per each click", () => {
    const mockMarkAsRead = jest.fn();
    const component = shallow(
    <NotificationItem
        value="click test"
        id={7}
        markAsRead={ mockMarkAsRead }
      />
    );

    // let simulate a click
    component.find("li").simulate("click");
    expect(mockMarkAsRead).toBeCalledTimes(1);
    expect(mockMarkAsRead).toBeCalledWith(7);
    mockMarkAsRead.mockReset();
  });

});
