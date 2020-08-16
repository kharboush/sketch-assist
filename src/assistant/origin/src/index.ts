import { AssistantPackage } from '@sketch-hq/sketch-assistant-types';
import { extendedAssistants, rules } from './config';

const assistant: AssistantPackage = [
  ...extendedAssistants,
  async () => {
    return {
      name: require('../package.json').name || 'untitled-assistant',
      rules: [],
      config: {
        rules,
      },
    };
  },
];

export default assistant;
