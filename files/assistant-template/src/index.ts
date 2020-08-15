import { AssistantPackage } from '@sketch-hq/sketch-assistant-types'
import CoreAssistant from '@sketch-hq/sketch-core-assistant'
import textDisallow from './rules/text-disallow'

const assistant: AssistantPackage = [
  CoreAssistant,
  async () => {
    return {
      name: 'sketch-modular-assistant',
      rules: [textDisallow],
      config: {
        rules: {
          'sketch-modular-assistant/text-disallow': {
            active: true,
            pattern: 'customstringplaceholder',
          },
          '@sketch-hq/sketch-core-assistant/shadows-no-disabled': {
            active: true,
          },
        },
      },
    }
  },
]

;(async () => {
  console.log(assistant[1].toString())
})()

export default assistant
