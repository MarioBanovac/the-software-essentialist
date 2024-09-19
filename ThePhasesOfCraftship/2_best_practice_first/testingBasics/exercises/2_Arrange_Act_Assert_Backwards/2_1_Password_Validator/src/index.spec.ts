import PasswordValidator from "."

describe('password validator', () => {
  test.each(['password', '12345', '#$%&/'])('knows that the password: %s is between 5 and 15 characters long', () => { 
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.isValid('password')).toEqual({
      success: true
    })
  })
})


