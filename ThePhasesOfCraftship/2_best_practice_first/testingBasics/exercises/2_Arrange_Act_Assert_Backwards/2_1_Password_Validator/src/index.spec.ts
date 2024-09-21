import PasswordValidator from ".";

describe("password validator", () => {
  let passwordValidator: PasswordValidator;
  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  test.each([
    ["pass", { success: false, errors: ["INVALID_LENGTH", "NO_DIGIT", "NO_UPPERCASE"]}],
    ["1pas", { success: false, errors: ["INVALID_LENGTH", "NO_UPPERCASE"]}],
    ["Password", { success: false, errors: ["NO_DIGIT"]}]
  ])("knows when the password: %s is not valid", (userInput, expected) => {
    expect(passwordValidator.isValid(userInput)).toEqual(expected);
  });

  test.each([
    ["Password1", { success: true, errors: [] }],
    ["1passworD", { success: true, errors: [] }],
    ["Password$1", { success: true, errors: [] }],
  ])("knows when the password: %s is valid", (userInput, expected) => {
    expect(passwordValidator.isValid(userInput)).toEqual(expected);
  });
});
