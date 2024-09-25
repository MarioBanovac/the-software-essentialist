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
  test('should know that 18:00 - 09:59 is a valid military time', () => {
    expect(militaryTimeValidator.isValidRange('18:00 - 09:59')).toBeTruthy()
  })
  test('should know that 01:01 - 09:10 is a valid military time', () => {
    expect(militaryTimeValidator.isValidRange('01:01 - 09:10')).toBeTruthy()
  })
  test.each(['25:00 - 01:00', '10:45 - 27:15', '23:60 - 13:00', '12:00 - 19:61'])('should know that %s is not a valid military time', (time) => {
    expect(militaryTimeValidator.isValidRange(time)).toBeFalsy()
  })
})
