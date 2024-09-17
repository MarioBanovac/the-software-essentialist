import fizzBuzz from "./fizzbuzz";

describe("fizzbuzz", () => {

  test("each return value is a string", () => {
    expect(typeof fizzBuzz()).toBe("string")
  })
  
  test("for input 3 the output is Fizz", () => {
    expect(fizzBuzz(3)).toBe("Fizz")
  })
});
