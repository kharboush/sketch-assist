export interface RuleDTO {
  name: string;
  config: any & { active: boolean };
}

export interface CoreAssistantDTO {
  packageName: string;
  rules: RuleDTO[];
}

export interface CreateAssistantDTO {
  name: string;
  description: string;
  version: string;
  icon: string;
  assistants: CoreAssistantDTO[];
}
