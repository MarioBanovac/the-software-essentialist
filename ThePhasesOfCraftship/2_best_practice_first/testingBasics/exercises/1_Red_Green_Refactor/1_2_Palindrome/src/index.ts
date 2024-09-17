export interface IPalindromeChecker {
  isAPalindrome: (word: string) => boolean
  getReverseWord: (word: string) => string
}

export default class PalindromeChecker implements IPalindromeChecker {
  
  getReverseWord(word: string): string {
    return word.split('').reverse().join('')
  }
  
  isAPalindrome(word: string) {
    const reverseWord = this.getReverseWord(word).toLowerCase()
    return word.toLowerCase() == reverseWord
  }
}
