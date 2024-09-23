RESPONSIBILITIES

KNOWINGS:
- INPUT IS AN ARRAY OF INTEGERS (NEGATIVE AND POSITIVE INTEGERS)
- OUTPUT IS AN OBJECT CONTAINING FOLLOWING PROPERTIES
- minimumValue, maximumValue, size and average

DOINGS:
- find the minimum value from the array
- find the maximum value from the array
- find the number of elements in the array
- find the average value of the array


EXAMPLES:
INPUT: [2, 4, 21, -8, 53, 40]
OUTPUT: {
minimumValue: -8,
maximumValue: 53,
size: 6,
averageValue: 18.667
}


ARCHITECT:

// it will accept arbitrary number of arguments
statsCalculator.getStats([1,2,3,4,5])
statsCaluculator.getStats(1,2,3,4,5)

PUBLICLY AVAILABLE METHODS
getStats

PRIVATE METHODS
getMaximumValue(...input)
getMinimumValue(...input)
getAverageValue(...input)

OUTPUT
{
  minimumValue: getMinimumValue(...input),
  maximumValue: getMaximumValue(...input),
  size: input.length,
  average: getAverageValue(...input)
}

CLARIFY BEFORE YOU VERIFY
- WE WILL TEST IF THE OUTPUT HAS ALL OF THE PROPERTIES WE WANT
- WE WILL TEST EACH PROPERTY VALUE


