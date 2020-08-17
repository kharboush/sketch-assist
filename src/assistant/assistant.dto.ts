import {
  IsNotEmpty,
  isNotEmptyObject,
  IsOptional,
  Length,
} from 'class-validator';

export class CreateAssistantDTO {
  @IsNotEmpty()
  @Length(3, 36)
  name: string;
  @IsNotEmpty()
  @Length(6, 72)
  description: string;
  @IsOptional()
  @Length(1, 9)
  version: string;
  @IsOptional()
  icon: string;
  @IsNotEmpty()
  assistants: ReturnAssistantDTO[];
}

export class ReturnAssistantDTO {
  @IsNotEmpty()
  @Length(3, 36)
  assistant: string;
  @IsNotEmpty()
  rules: RuleDTO[];
}

class RuleDTO {
  @IsNotEmpty()
  @Length(3, 36)
  name: string;
  @IsNotEmpty()
  config: any;
}
