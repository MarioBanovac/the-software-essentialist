
import StatsCalculator from "."

describe('stats calculator', () => {
  test('knows how to find the minimum value', () => {
    const statsCalculator = new StatsCalculator()
    
    const inputStats = statsCalculator.getStats([2,4,21,-8,53,40])
    
    expect(inputStats).toHaveProperty('minimumValue')
    expect(inputStats.minimumValue).toBe(-8)
  })
  
  test('knows how to find the maximum value', () => {
    
    const statsCalculator = new StatsCalculator()
    
    const inputStats = statsCalculator.getStats([2,4,21,-8,53,40])
    
    expect(inputStats).toHaveProperty('maximumValue')
    expect(inputStats.maximumValue).toBe(53)
  })
})
