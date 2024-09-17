export default function fizzBuzz(input: number): string {
  if (input % 15 === 0) return "FizzBuzz";
  if (input % 5 === 0) return "Buzz";
  if (input % 3 === 0) return "Fizz";
  return input.toString();
}
