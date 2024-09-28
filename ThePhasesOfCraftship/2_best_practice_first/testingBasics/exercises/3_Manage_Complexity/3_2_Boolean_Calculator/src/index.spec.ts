import BooleanCalculator from "."

describe('boolean calculator', () => {
  let booleanCalculator: BooleanCalculator
  
  beforeEach(() => {
    booleanCalculator = new BooleanCalculator()
  })
  
  test('knows that "TRUE" should return true', () => { 
    expect(booleanCalculator.calculate("TRUE")).toBe(true)
  })
  
  test('knows that "FALSE" should return false', () => {
    expect(booleanCalculator.calculate("FALSE")).toBe(false)
  })
  
  test('knows that "NOT" operator reverts the expression', () => {
    expect(booleanCalculator.calculate("NOT FALSE")).toBe(true)
    expect(booleanCalculator.calculate("NOT TRUE")).toBe(false)
  })
})
