export default class MilitaryTimeValidator {
  public isValidRange(time: string): boolean {
    const startHour = parseInt(time.split('-')[0].split(':')[0])
    return startHour >= 0 && startHour <= 24
  }
}
