import PasswordValidator from "."

describe('password validator', () => {
  test.each(['password', '12345', '#$%&/'])('knows that the password: %s is between 5 and 15 characters long', (userInput) => { 
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.isValid(userInput)).toEqual({
      success: true
    })
  })
  
  test('knows when the password is not between 5 and 15 characters long', () => {
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.isValid('pass')).toEqual({
      success: false,
      error: ['password is too short']
    })
  })
})


