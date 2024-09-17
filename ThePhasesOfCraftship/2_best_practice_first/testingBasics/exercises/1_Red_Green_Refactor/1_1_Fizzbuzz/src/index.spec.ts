import fizzBuzz from "./fizzbuzz";

describe("fizzbuzz", () => {

  test.each([3, 9, 42])("for input %i the output is Fizz", (input) => {
    expect(fizzBuzz(input)).toBe("Fizz");
  });

  test.each([5, 20, 40])("for input %i the output is Buzz", (input) => {
    expect(fizzBuzz(input)).toBe("Buzz");
  });

  test.each([15, 45, 90])("for input %i the output is FizzBuzz", (input) => {
    expect(fizzBuzz(input)).toBe("FizzBuzz");
  });

  test.each([
    [2, "2"],
    [17, "17"],
    [26, "26"],
  ])("for input %i the output is %p", (input) => {
    expect(fizzBuzz(input)).toBe(input.toString());
  });

  test("for numbers larger than 100 an error is thrown", () => {
    expect(() => fizzBuzz(101)).toThrowError("The number is too big");
  });

  test("for numbers smaller than 0 an error is thrown", () => {
    expect(() => fizzBuzz(-1)).toThrowError("The number is too small");
  });

  test("for inputs that are not numbers an error is thrown", () => {
    expect(() => fizzBuzz([])).toThrowError("Invalid argument");
  });
});
