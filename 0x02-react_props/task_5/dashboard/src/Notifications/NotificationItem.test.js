import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';

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
    expect(component.html()).toEqual('<li data-notification-type="default">test</li>');
  });

  it("test that it renders the correct html by passing the html prop <ul>test</ul>", () => {
    const component = shallow(<NotificationItem />);
    component.setProps({ html: "<ul>test</ul>" })
    expect(component.html()).toEqual('<li data-urgent="true"><ul>test</ul></li>');
  });

});
