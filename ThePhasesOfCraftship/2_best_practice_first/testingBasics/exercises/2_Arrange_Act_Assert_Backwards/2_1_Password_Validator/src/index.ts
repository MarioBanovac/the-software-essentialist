export default class PasswordValidator {
   hasValidLength(userInput: string) {
    const isLengthValid = userInput.length >= 5 && userInput.length <= 15;

    return isLengthValid;
  }
  
  containsDigit(userInput: string) {
    return /\d/.test(userInput)
  }

  isValid(userInput: string) {
    if (this.hasValidLength(userInput)) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        error: ['password is too short']
      }
    }
  }
}
