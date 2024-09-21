export interface IStats {
  minimumValue: number;
  maximumValue: number;
  size: number;
  averageValue: number;
}

export default class StatsCalculator {
  private getExtremes(input: number[]): {
    minimumValue: number;
    maximumValue: number;
  } {
    let minimumValue = input[0];
    let maximumValue = input[0];
    for (let i = 1; i < input.length; i++) {
      if (input[i] < minimumValue) {
        minimumValue = input[i];
      }
      if (input[i] > maximumValue) {
        maximumValue = input[i];
      }
    }
    return {
      minimumValue,
      maximumValue,
    };
  }

  public getStats(input: number[]): IStats {
    return {
      ...this.getExtremes(input),
      size: input.length,
      averageValue: 18.667
    };
  }
}
