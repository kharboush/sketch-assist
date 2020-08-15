import { AssistantPackage } from '@sketch-hq/sketch-assistant-types';
import CoreAssistant from '@sketch-hq/sketch-core-assistant';
import textDisallow from './rules/text-disallow';
import { rules } from './RULE_CONFIG';

const assistant: AssistantPackage = [
  CoreAssistant,
  async () => {
    return {
      name: 'sketch-modular-assistant',
      rules: [textDisallow],
      config: {
        rules,
      },
    };
  },
];

export default assistant;
