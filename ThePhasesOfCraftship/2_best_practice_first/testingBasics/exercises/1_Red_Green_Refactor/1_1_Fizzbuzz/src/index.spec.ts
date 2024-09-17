import fizzBuzz from "./fizzbuzz";

describe("fizzbuzz", () => {
  test("each return value is a string", () => {
    expect(typeof fizzBuzz(3)).toBe("string");
  });

  test("for input 3 the output is Fizz", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });
  
  test("for input 5 the output is Buzz", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });
  
  test("for input 15 the output is FizzBuzz", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });
  
  test("for input 9 the output is Fizz", () => {
    expect(fizzBuzz(9)).toBe("Fizz");
  });
  
  test("for input 43 the output is 43", () => {
    expect(fizzBuzz(43)).toBe("43");
  });
  
  test("for input 42 the output is Fizz", () => {
    expect(fizzBuzz(42)).toBe("Fizz");
  });
  
  test("for input 45 the output is FizzBuzz", () => {
    expect(fizzBuzz(45)).toBe("FizzBuzz");
  });
  
  test("for numbers larger than 100 an error is thrown", () => {
    expect(() => fizzBuzz(101)).toThrowError('The number is too big')
  });
  
  test("for numbers smaller than 0 an error is thrown", () => {
    expect(() => fizzBuzz(-1)).toThrowError('The number is too small')
  });
  
  test("for inputs that are not numbers an error is thrown", () => {
    expect(() => fizzBuzz([])).toThrowError('Invalid argument')
  });
});
