import MilitaryTimeValidator from "."

describe('military time validator', () => {
  let militaryTimeValidator: MilitaryTimeValidator
  beforeEach(() => {
    militaryTimeValidator = new MilitaryTimeValidator()
  })
  
  test('should be defined', () => { 
    expect(militaryTimeValidator).toBeDefined()
  })
  
  test('should know that 00:00 - 23:59 is a valid military time', () => {
    expect(militaryTimeValidator.isValidRange('00:00 - 23:59')).toBeTruthy()
  })
  test('should know that 25:00 - 01:00 is not a valid military time', () => {
    expect(militaryTimeValidator.isValidRange('25:00 - 01:00')).toBeFalsy()
  })
})
