import React from "react";
import { shallow } from "enzyme";
import BodySectionWithMarginBottom from "./BodySectionWithMarginBottom";
import "./BodySectionWithMarginBottom.css";
import BodySection from "./BodySection";

describe("test that BodySectionWithMarginBottom returns predictable result", () => {
  it("verifies that the component doesnt crash", () => {
    const component = shallow(<BodySectionWithMarginBottom title="existence;test" />);
    expect(component.exists()).toBe(true);
  });

  it("tests that the component renders the BpdySection and with the right props passed down to it", () => {
    const component = shallow(
      <BodySectionWithMarginBottom title="test bottom-margin">
        <p>test Bottom margin</p>
      </BodySectionWithMarginBottom>
    );

    const BodySection = component.find("BodySection");
    expect(BodySection.exists()).toBe(true);
    expect(BodySection.prop("title")).toEqual("test bottom-margin");
    expect(BodySection.containsMatchingElement(<p>test Bottom margin</p>)).toBe(true);
  });

  /*it("test if the css style is correctly applied to the component", () => {
      const component = shallow(<BodySectionWithMarginBottom title="style test" />);
    const BodySection = component.find(".BodySectionWithMarginBottom");
    expect(BodySection.props.style).toHaveProperty("margin-bottom", "40px");
  });*/

});
