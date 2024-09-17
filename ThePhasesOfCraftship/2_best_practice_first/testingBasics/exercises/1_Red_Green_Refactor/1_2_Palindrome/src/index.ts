export interface IPalindromeChecker {
  isAPalindrome: (word: string) => boolean
}

export default class PalindromeChecker implements IPalindromeChecker {
  isAPalindrome(word: string) {
    const reverseWord = word.split('').reverse().join('')
    return word === reverseWord
  }
}
