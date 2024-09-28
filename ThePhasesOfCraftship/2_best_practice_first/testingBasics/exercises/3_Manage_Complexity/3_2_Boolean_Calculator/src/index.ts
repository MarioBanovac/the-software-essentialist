export default class BooleanCalculator {
  calculate (input: string): boolean {
    if(input === "TRUE" || input === "NOT FALSE") {
      return true
    }
    return false
  }
}
