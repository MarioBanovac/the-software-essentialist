export default class MilitaryTimeValidator {
  public isValidRange(time: string): boolean {
    const [startHour, startMinute] = this.extractStartTime(time)
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
  
  private extractStartTime(time: string): [number, number] {
    const startTime = time.split('-')[0].split(':')
    return [parseInt(startTime[0]), parseInt(startTime[1])]
  }
  
  private extractEndHour(time:string): number {
    return parseInt(time.split('-')[1].split(':')[0])
  }
  
  private extractEndMinute(time:string): number {
    return parseInt(time.split('-')[1].split(':')[1])
  }
}
