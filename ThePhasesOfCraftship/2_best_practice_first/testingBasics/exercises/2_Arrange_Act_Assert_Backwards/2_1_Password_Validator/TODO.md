RESPONSIBILITIES

KNOWINGS:
- knows when password is between 5 and 15 characters (i.e input: password)
- knows when password is not between 5 and 15 characters (i.e input: pass or password12345678)
- knows when password contains at least one digit (i.e input: pass1, 1pass)
- knows when password does not contain at least one digit (i.e input: password$)
- knows when password contains at least one upper case letter (i.e input: Password$)
- knows when password does not contain at least one upper case letter (i.e input: pass12345)

DOINGS:
- returns an object that contains a boolean and errors key if criteria not met


ARCHITECTURE:
- ideally the input is a string that can contain any character (letter, digit, space, special character, whitespace character)
- if input !== string OR the acceptance criteria not met return an object with errors key

OBJECT SHAPE:
{
  success: true | false,
  error?: [ERROR.TOO_SHORT, ERROR.TOO_LONG, ERROR.NO_DIGIT, ERROR.NO_UPPERCASE, ERROR.INVALID_INPUT]
}
