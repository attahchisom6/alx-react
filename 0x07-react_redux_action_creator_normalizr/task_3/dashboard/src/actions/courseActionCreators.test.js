import { unSelectCourse, selectCourse } from "./courseActionCreators";

describe("test that actionCreator functions create the right action", () => {
  it("create action for course selection", () => {
    const selectAction  = {
      type: "SELECT_COURSE",
      index: 1,
    };
    const actualAction =  selectCourse(1);
    expect(actualAction).toEqual(selectAction);
  });

  it("create action for course unselection", () => {
    const unselectAction  = {
      type: "UNSELECT_COURSE",
      index: 1,
    };
    const actualAction =  unSelectCourse(1);
    expect(actualAction).toEqual(unselectAction);
  });
});
