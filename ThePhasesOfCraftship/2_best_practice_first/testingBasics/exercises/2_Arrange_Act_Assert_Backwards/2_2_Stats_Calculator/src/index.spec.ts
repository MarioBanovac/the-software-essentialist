
import StatsCalculator, { IStats } from "."

describe('stats calculator', () => {
  let statsCalculator: StatsCalculator
  let inputStats: IStats | undefined
  beforeEach(() => {
    statsCalculator = new StatsCalculator()
    inputStats = undefined
  })
  
  test('knows how to find the minimum value', () => {
    inputStats =  statsCalculator.getStats([2,4,21,-8,53,40])
    
    expect(inputStats).toHaveProperty('minimumValue')
    expect(inputStats.minimumValue).toBe(-8)
  })
  
  test('knows how to find the maximum value', () => {
    inputStats = statsCalculator.getStats([2,4,21,-8,53,40])
    
    expect(inputStats).toHaveProperty('maximumValue')
    expect(inputStats.maximumValue).toBe(53)
  })
  
  test('knows how to find the number of elements', () => {
    inputStats = statsCalculator.getStats([2,4,21,-8,53,40])
    
    expect(inputStats).toHaveProperty('size')
    expect(inputStats.size).toBe(6)
  })
})
