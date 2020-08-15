import { RuleDefinition } from '@sketch-hq/sketch-assistant-types'

const textDisallow: RuleDefinition = {
  rule: async (context) => {
    const { utils } = context
    const pattern = utils.getOption('pattern')
    if (typeof pattern !== 'string') throw Error()
    // Iterate
    for (const layer of utils.objects.text) {
      const value = layer.attributedString.string
      // Test
      if (value.toLowerCase().includes(pattern)) {
        // Report
        utils.report(`Layer “${layer.name}” contains ${pattern}`, layer)
      }
    }
  },
  name: 'sketch-modular-assistant/text-disallow',
  title: (config) => `Text should not contain a "${config.pattern}"`,
  description: 'Reports a violation when text layers contain a text pattern',
}

export default textDisallow
