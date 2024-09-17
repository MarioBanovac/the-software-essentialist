import PalindromeChecker from "."

describe('palindrome checker', () => {
  test.each([['eye', true], ['mom', true], ['wow', true]])('should be able to detect that a %s is a palindrome', (input, expected) => {
    const palindromeChecker = new PalindromeChecker()
    expect(palindromeChecker.isAPalindrome(input)).toBe(expected)
  })
})
