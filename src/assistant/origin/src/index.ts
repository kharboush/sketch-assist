import { AssistantPackage } from '@sketch-hq/sketch-assistant-types';

const rules = require('./config.js').rules;
const extendedAssistants = require('./config.js').extendedAssistants;
const packageName = require('../package.json').name;

const assistant: AssistantPackage = [
  ...extendedAssistants,
  async () => {
    return {
      name: packageName || 'untitled-assistant',
      rules: [],
      config: {
        rules,
      },
    };
  },
];

export default assistant;
