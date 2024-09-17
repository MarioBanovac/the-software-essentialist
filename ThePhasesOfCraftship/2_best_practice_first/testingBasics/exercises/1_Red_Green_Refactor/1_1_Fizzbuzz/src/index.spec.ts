import fizzBuzz from "./fizzbuzz";

describe("fizzbuzz", () => {

  test("each return value is a string", () => {
    expect(typeof fizzBuzz()).toBe("string")
  })
});
