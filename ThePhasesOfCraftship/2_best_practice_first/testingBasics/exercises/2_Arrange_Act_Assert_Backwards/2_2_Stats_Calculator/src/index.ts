export interface IStats {
  minimumValue: number,
  maximumValue: number,
  size: number
}

export default class StatsCalculator {
  
  private getMinimumValue(input: number[]): number {
    let minimumValue = input[0]
    for(let i = 1; i < input.length; i++) {
      if(input[i] < minimumValue) {
        minimumValue = input[i]
      }
    }
    return minimumValue
  }
  
  private getMaximumValue(input: number[]): number {
    let maximumValue = input[0]
    for(let i = 1; i < input.length; i++) {
      if(input[i] > maximumValue) {
        maximumValue = input[i]
      }
    }
    return maximumValue
  }
  
  public getStats(input: number[]): IStats {
    return {
      minimumValue: this.getMinimumValue(input),
      maximumValue: this.getMaximumValue(input),
      size: input.length
    }
  }
}
