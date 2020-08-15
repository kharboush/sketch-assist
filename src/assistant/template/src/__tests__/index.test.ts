import { resolve } from 'path'
import { testAssistant } from '@sketch-hq/sketch-assistant-utils'

import Assistant from '..'
import { Violation } from '@sketch-hq/sketch-assistant-types'

const checkIfRuleHasBeenBroken = (ruleName: string, violations: Violation[]): boolean => {
  const rulesBroken = violations.map((v) => v.ruleName)
  return rulesBroken.some((rule) => rule.includes(ruleName))
}

test('text-disallow', async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './test.sketch'),
    Assistant,
  )

  const result = checkIfRuleHasBeenBroken('text-disallow', violations)

  expect(result).toBe(true)
  expect(ruleErrors).toHaveLength(0)
})

test('shadows-no-disabled', async () => {
  const { violations, ruleErrors } = await testAssistant(
    resolve(__dirname, './test.sketch'),
    Assistant,
  )

  const result = checkIfRuleHasBeenBroken('shadows-no-disabled', violations)

  expect(result).toBe(true)
  expect(ruleErrors).toHaveLength(0)
})
