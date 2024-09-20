export default class PasswordValidator {
  public hasValidLength(userInput: string): boolean {
    const isLengthValid = userInput.length >= 5 && userInput.length <= 15;

    return isLengthValid;
  }

  public containsDigit(userInput: string): boolean {
    return /\d/.test(userInput);
  }

  public containsUppercase(userInput: string): boolean {
    return /[A-Z]/.test(userInput);
  }

  public isValid(userInput: string) {
    let returnObject: {
      success: null | boolean;
      errors: string[];
    } = {
      success: null,
      errors: [],
    };

    if (
      this.hasValidLength(userInput) &&
      this.containsDigit(userInput) &&
      this.containsUppercase(userInput)
    ) {
      return {
        ...returnObject,
        success: true,
      };
    }

    if (!this.hasValidLength(userInput)) {
      returnObject.errors.push("TOO_SHORT");
    }

    if (!this.containsDigit(userInput)) {
      returnObject.errors.push("NO_DIGIT");
    }
    
    if(!this.containsUppercase(userInput)) {
      returnObject.errors.push("NO_UPPERCASE")
    }
    
    return {
      ...returnObject,
      success: false
    }
  }
}
