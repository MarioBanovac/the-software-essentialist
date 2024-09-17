export interface IPalindromeChecker {
  isAPalindrome: (string: string) => boolean
}

export default class PalindromeChecker implements IPalindromeChecker {
  isAPalindrome(string: string) {
    return true
  }
}
