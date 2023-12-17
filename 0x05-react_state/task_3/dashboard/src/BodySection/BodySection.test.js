import React from "react";
import { shallow } from "enzyme";
import BodySection from "./BodySection";

describe("Testing that BodySection component renders a predictive result", () => {
  it ("tests that the component doesn't crash", () => {
    const component = shallow(<sectionBody />);
    expect(component.exists()).toBe(true);
  });

  it("test that it renders the children and one h2 element", () => {
    const component = shallow(
      <BodySection title="test title">
        <p>test children node</p>
      </BodySection>
    );

    expect(component.find("h2")).toHaveLength(1);
    expect(component.find("h2").html()).toEqual('<h2>test title</h2>');
    expect(component.containsMatchingElement(<p>test children node</p>)).toBe(true);
  });

});
