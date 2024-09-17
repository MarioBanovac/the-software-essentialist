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
});
