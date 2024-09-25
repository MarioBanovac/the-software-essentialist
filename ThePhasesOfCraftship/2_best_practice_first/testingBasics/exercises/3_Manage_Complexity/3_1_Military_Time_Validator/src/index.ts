export default class MilitaryTimeValidator {
  public isValidRange(time: string): boolean {
    const startHour = this.extractStartHour(time)
    const startMinute = this.extractStartMinute(time)
    const endHour = this.extractEndHour(time)
    const endMinute = parseInt(time.split('-')[1].split(':')[1])
    return startHour >= 0 && startHour < 24 && endHour >= 0 && endHour < 24 && startMinute >=0 && startMinute < 60 && endMinute >=0 && endMinute < 60
  }
  
  private extractStartHour(time: string): number {
    return parseInt(time.split('-')[0].split(':')[0])
  }
  
  private extractEndHour(time:string): number {
    return parseInt(time.split('-')[1].split(':')[0])
  }
  
  private extractStartMinute(time:string): number {
    return parseInt(time.split('-')[0].split(':')[1])
  }
}
