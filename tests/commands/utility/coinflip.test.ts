import { getOutcomeAsString } from '~/commands/utility/coinflip'

describe('getOutcomeAsString', () => {
  test("should return 'Heads' when outcome is false", () => {
    const outcome = false

    const actual = getOutcomeAsString(outcome)

    expect(actual).toBe('Heads')
  })

  test("should return 'Tails' when outcome is true", () => {
    const outcome = true

    const actual = getOutcomeAsString(outcome)

    expect(actual).toBe('Tails')
  })

  test('should return custom outcome when outcome is false and heads is provided', () => {
    const outcome = false
    const custom = 'Custom Heads'

    const actual = getOutcomeAsString(outcome, custom)

    expect(actual).toBe(custom)
  })

  test('should return custom outcome when outcome is true and tails is provided', () => {
    const outcome = true
    const custom = 'Custom Tails'

    const actual = getOutcomeAsString(outcome, '', custom)

    expect(actual).toBe(custom)
  })
})
