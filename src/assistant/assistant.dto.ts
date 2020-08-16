import { IsNotEmpty, Length } from 'class-validator';

export class CreateAssistantDTO {
  @Length(2, 24)
  @IsNotEmpty()
  name: string;
  @Length(2, 24)
  @IsNotEmpty()
  description: string;
  @Length(2, 24)
  @IsNotEmpty()
  version: string;
  @IsNotEmpty()
  icon: string;
  @IsNotEmpty()
  assistants: ReturnAssistantDTO[];
}

export class ReturnAssistantDTO {
  assistant: string;
  rules: RuleDTO[];
}

class RuleDTO {
  name: string;
  config: any;
}
