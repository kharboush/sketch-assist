import { AssistantPackage } from '@sketch-hq/sketch-assistant-types';
import CoreAssistant from '@sketch-hq/sketch-core-assistant';
import textDisallow from './rules/text-disallow';
import { rules } from './selectedRules';

const pkg = require('../package.json');

const assistant: AssistantPackage = [
  CoreAssistant,
  async () => {
    return {
      name: pkg.name || 'untitled-assistant',
      rules: [textDisallow],
      config: {
        rules,
      },
    };
  },
];

export default assistant;
