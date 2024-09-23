import StatsCalculator, { IStats } from ".";

describe("stats calculator", () => {
  let statsCalculator: StatsCalculator;
  let inputStats: IStats | undefined;
  const INPUT_DATA = [
    {
      input: [2, 4, 21, -8, 53, 40],
      expected: {
        minimumValue: -8,
        maximumValue: 53,
        size: 6,
        averageValue: 18,
      },
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: {
        minimumValue: 1,
        maximumValue: 5,
        size: 5,
        averageValue: 3,
      },
    },
    {
      input: [-100, 200, 300, 400, 22],
      expected: {
        minimumValue: -100,
        maximumValue: 400,
        size: 5,
        averageValue: 164,
      },
    },
  ];
  beforeEach(() => {
    statsCalculator = new StatsCalculator();
    inputStats = undefined;
  });

  test.each(INPUT_DATA)(
    "knows how to find the minimum value",
    ({ input, expected }) => {
      inputStats = statsCalculator.getStats(input);

      expect(inputStats).toHaveProperty("minimumValue");
      expect(inputStats.minimumValue).toBe(expected.minimumValue);
    }
  );

  test.each(INPUT_DATA)(
    "knows how to find the maximum value",
    ({ input, expected }) => {
      inputStats = statsCalculator.getStats(input);

      expect(inputStats).toHaveProperty("maximumValue");
      expect(inputStats.maximumValue).toBe(expected.maximumValue);
    }
  );

  test.each(INPUT_DATA)(
    "knows how to find the number of elements",
    ({ input, expected }) => {
      inputStats = statsCalculator.getStats(input);

      expect(inputStats).toHaveProperty("size");
      expect(inputStats.size).toBe(expected.size);
    }
  );

  test.each(INPUT_DATA)(
    "knows how to find the average value",
    ({ input, expected }) => {
      inputStats = statsCalculator.getStats(input);

      expect(inputStats).toHaveProperty("averageValue");
      expect(inputStats.averageValue).toBe(expected.averageValue);
    }
  );
});
