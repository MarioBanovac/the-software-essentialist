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

  private findWholeAverage(input: number[]): number {
    const rawAverage = input.reduce((acc, cur) => acc + cur, 0) / input.length;
    return parseInt(rawAverage.toString().split(".")[0]);
  }

  public getStats(input: number[]): IStats {
    return {
      ...this.getExtremes(input),
      size: input.length,
      averageValue: this.findWholeAverage(input),
    };
  }
}
