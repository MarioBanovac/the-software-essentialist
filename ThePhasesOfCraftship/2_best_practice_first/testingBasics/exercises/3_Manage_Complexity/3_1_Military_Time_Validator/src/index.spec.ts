import MilitaryTimeValidator from "."

describe('military time validator', () => {
  test('should be defined', () => { 
    let militaryTimeValidator = new MilitaryTimeValidator()
    expect(militaryTimeValidator).toBeDefined()
  })
})
