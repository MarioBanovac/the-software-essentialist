import PalindromeChecker from "."

describe('palindrome checker', () => {
  test('should be able to detect that a string is a palindrome', () => {
    const palindromeChecker = new PalindromeChecker()
    expect(palindromeChecker.isAPalindrome('eye')).toBe(true)
  })
})
