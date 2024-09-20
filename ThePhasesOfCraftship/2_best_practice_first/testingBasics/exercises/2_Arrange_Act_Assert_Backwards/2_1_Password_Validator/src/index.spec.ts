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
    (userInput) => {
      expect(passwordValidator.containsDigit(userInput)).toBeTruthy();
    }
  );

  test.each(["password", "$pass_", "qwertz"])(
    "knows that the password: %s does not contain a digit",
    (userInput) => {
      expect(passwordValidator.containsDigit(userInput)).toBeFalsy();
    }
  );

  test.each(["Password", "Random", "1pasS"])(
    "knows that the password: %s contains an uppercase letter",
    (userInput) => {
      expect(passwordValidator.containsUppercase(userInput)).toBeTruthy();
    }
  );

  test.each(["password", "random", "1pass"])(
    "knows that the password: %s does not contain an uppercase letter",
    (userInput) => {
      expect(passwordValidator.containsUppercase(userInput)).toBeFalsy();
    }
  );

  test.each([
    ["pass", ["TOO_SHORT", "NO_DIGIT", "NO_UPPERCASE"]],
    ["1pas", ["TOO_SHORT", "NO_UPPERCASE"]],
    ["Password$", ["NO_DIGIT"]],
  ])("knows when the password: %s is not valid", (userInput, errors) => {
    expect(passwordValidator.isValid(userInput)).toEqual({
      success: false,
      errors,
    });
  });
  
  test('knows when the passwor is valid', () => { 
    expect(passwordValidator.isValid('Password1')).toEqual({
      success: true,
      errors: []
    })
   })
});
