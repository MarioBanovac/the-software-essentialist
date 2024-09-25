import MilitaryTimeValidator from "."

describe('military time validator', () => {
  test('should be defined', () => { 
    let militaryTimeValidator = new MilitaryTimeValidator()
    expect(militaryTimeValidator).toBeDefined()
  })
  
  test('should know that 00:00 - 23:59 is a valid military time', () => {
    let militaryTimeValidator = new MilitaryTimeValidator()
    expect(militaryTimeValidator.isValidRange('00:00 - 23:59')).toBeTruthy()
  })
  test('should know that 25:00 - 01:00 is not a valid military time', () => {
    let militaryTimeValidator = new MilitaryTimeValidator()
    expect(militaryTimeValidator.isValidRange('25:00 - 01:00')).toBeFalsy()
  })
})
