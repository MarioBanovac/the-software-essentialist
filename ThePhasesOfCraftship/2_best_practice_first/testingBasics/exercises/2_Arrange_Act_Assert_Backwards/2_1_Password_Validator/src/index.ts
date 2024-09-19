export default class PasswordValidator {
  private hasValidLength(userInput: string) {
    const isLengthValid = userInput.length >= 5 && userInput.length <= 15;

    return isLengthValid;
  }

  isValid(userInput: string) {
    if (this.hasValidLength(userInput)) {
      return {
        success: true,
      };
    }
  }
}
