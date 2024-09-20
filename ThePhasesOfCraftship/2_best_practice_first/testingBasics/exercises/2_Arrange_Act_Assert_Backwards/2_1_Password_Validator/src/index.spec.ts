import PasswordValidator from ".";

describe("password validator", () => {
  let passwordValidator: PasswordValidator;
  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  test.each(["password", "12345", "#$%&/"])(
    "knows that the password: %s is between 5 and 15 characters long",
    (userInput) => {
      expect(passwordValidator.hasValidLength(userInput)).toBeTruthy();
    }
  );

  test.each(["pass", "password12345678"])(
    "knows that the password: %s is not between 5 and 15 characters long",
    (userInput) => {
      expect(passwordValidator.hasValidLength(userInput)).toBeFalsy();
    }
  );

  test.each(["pass1", "1pass", "pass1word$"])(
    "knows that the password: %s contains a digit",
    () => {
      expect(passwordValidator.containsDigit("pass1")).toBeTruthy();
    }
  );
});
