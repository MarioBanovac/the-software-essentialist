export default class MilitaryTimeValidator {
  public isValidRange(time: string): boolean {
    const startHour = this.extractStartHour(time)
    const startMinute = this.extractStartMinute(time)
    const endHour = this.extractEndHour(time)
    const endMinute = this.extractEndMinute(time)
    return this.isValidHour(startHour) && this.isValidHour(endHour) && this.isValidMinute(startMinute) && this.isValidMinute(endMinute)
  }
  
  private isValidHour(hour: number): boolean {
    return hour >=0 && hour < 24
  }
  
  private isValidMinute(minute: number): boolean {
    return minute >= 0 && minute < 60
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
  
  private extractEndMinute(time:string): number {
    return parseInt(time.split('-')[1].split(':')[1])
  }
}
