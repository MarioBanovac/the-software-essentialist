import PalindromeChecker from ".";

describe("palindrome checker", () => {
  let palindromeChecker: PalindromeChecker;
  beforeEach(() => {
    palindromeChecker = new PalindromeChecker();
  });

  test.each([
    ["eye", true],
    ["mom", true],
    ["wow", true],
  ])("should be able to detect that a %s is a palindrome", (word, expected) => {
    expect(palindromeChecker.isAPalindrome(word)).toBe(expected);
  });

  test.each([
    ["bill", false],
    ["car", false],
    ["code", false],
  ])(
    "should be able to detect that %s is not a palindrome",
    (word, expected) => {
      expect(palindromeChecker.isAPalindrome(word)).toBe(expected);
    }
  );

  test("should be able to detect palindromes no matter the casing", () => {
    expect(palindromeChecker.isAPalindrome("Mom")).toBe(true);
  });
});
