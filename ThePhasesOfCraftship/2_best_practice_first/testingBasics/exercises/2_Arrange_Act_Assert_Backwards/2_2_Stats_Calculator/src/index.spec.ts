
import StatsCalculator, { IStats } from "."

describe('stats calculator', () => {
  let statsCalculator: StatsCalculator
  let inputStats: IStats | undefined
  const TEST_DATA = [
    [
      [2,4,21,-8,53,40]
    ]
  ]
  beforeEach(() => {
    statsCalculator = new StatsCalculator()
    inputStats = undefined
  })
  
  test.each(TEST_DATA)('knows how to find the minimum value', (input) => {
    inputStats =  statsCalculator.getStats(input)
    
    expect(inputStats).toHaveProperty('minimumValue')
    expect(inputStats.minimumValue).toBe(-8)
  })
  
  test.each(TEST_DATA)('knows how to find the maximum value', (input) => {
    inputStats = statsCalculator.getStats(input)
    
    expect(inputStats).toHaveProperty('maximumValue')
    expect(inputStats.maximumValue).toBe(53)
  })
  
  test.each(TEST_DATA)('knows how to find the number of elements', (input) => {
    inputStats = statsCalculator.getStats(input)
    
    expect(inputStats).toHaveProperty('size')
    expect(inputStats.size).toBe(6)
  })
  
  test.each(TEST_DATA)('knows how to find the average value', (input) => {
    inputStats = statsCalculator.getStats(input)
    
    expect(inputStats).toHaveProperty('averageValue')
    expect(inputStats.averageValue).toBe(18)
  })
})
