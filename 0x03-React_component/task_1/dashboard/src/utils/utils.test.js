import nameItAnything from './utils';

const { getFullYear, getFooterCopy, getLatestNotification } = nameItAnything;

describe("A test to see if the imported functions work correctly", () => {
  test("accurate current year is returned", () => {
    expect(getFullYear()).toBe(2023);
  });

  test('test the copyroighf of the footer', () => {
    expect(getFooterCopy(true)).toBe("Holberton School");
    expect(getFooterCopy(false)).toBe("Holberton School main dashboard");
  });

  test("test the accuracy of the string returned", () => {
    expect(getLatestNotification()).toBe("<strong>Urgent requirement</strong> - complete by EOD");
  });

});
