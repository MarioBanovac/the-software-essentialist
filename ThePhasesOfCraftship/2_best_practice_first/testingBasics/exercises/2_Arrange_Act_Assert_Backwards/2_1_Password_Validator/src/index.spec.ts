import PasswordValidator from "."

describe('password validator', () => {
  test('knows if the password is between 5 and 15 characters long', () => { 
    let passwordValidator = new PasswordValidator()
    expect(passwordValidator.isValid('password')).toEqual({
      success: true
    })
  })
})


