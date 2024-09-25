export default class MilitaryTimeValidator {
  public isValidRange(time: string): boolean {
    const startHour = this.extractStartHour(time)
    const endHour = parseInt(time.split('-')[1].split(':')[0])
    return startHour >= 0 && startHour < 24 && endHour >= 0 && endHour < 24
  }
  
  private extractStartHour(time: string): number {
    return parseInt(time.split('-')[0].split(':')[0])
  }
}
