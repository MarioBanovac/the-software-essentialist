import PasswordValidator from "."

describe('password validator', () => {
  test.each(['password', '12345', '#$%&/'])('knows that the password: %s is between 5 and 15 characters long', (userInput) => { 
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.hasValidLength(userInput)).toBeTruthy()
  })
  
  test.each(['pass', 'password12345678'])('knows that the password: %s is not between 5 and 15 characters long', (userInput) => {
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.hasValidLength(userInput)).toBeFalsy()
  })
})


