import BooleanCalculator from "."

describe('boolean calculator', () => {
  test('knows that "TRUE" should return true', () => { 
    const booleanCalculator = new BooleanCalculator()
    expect(booleanCalculator.calculate("TRUE")).toBe(true)
  })
})
