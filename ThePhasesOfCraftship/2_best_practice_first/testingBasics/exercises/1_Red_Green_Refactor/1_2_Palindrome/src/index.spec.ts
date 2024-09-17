import PalindromeChecker from "."

describe('palindrome checker', () => {
  test.each([['eye', true], ['mom', true], ['wow', true]])('should be able to detect that a %s is a palindrome', (word, expected) => {
    const palindromeChecker = new PalindromeChecker()
    expect(palindromeChecker.isAPalindrome(word)).toBe(expected)
  })
  
  test.each([['bill', false], ['car', false], ['code', false]])('should be able to detect that %s is not a palindrome', (word, expected) => {
    const palindromeChecker = new PalindromeChecker()
    expect(palindromeChecker.isAPalindrome(word)).toBe(expected)
  })
})
