export interface IPalindromeChecker {
  isAPalindrome: (word: string) => boolean
  getReverseWord: (word: string) => string
  getWordWithoutSpaces: (word: string) => string
}

export default class PalindromeChecker implements IPalindromeChecker {
  
  getReverseWord(word: string): string {
    return word.split('').reverse().join('')
  }
  
  getWordWithoutSpaces(word: string): string {
    return word.replace(/\s/g, '')
  }
  
  isAPalindrome(word: string) {
    const reverseWord = this.getReverseWord(this.getWordWithoutSpaces(word)).toLowerCase()
    return this.getWordWithoutSpaces(word).toLowerCase() == reverseWord
  }
}
