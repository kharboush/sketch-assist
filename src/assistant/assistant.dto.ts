import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateAssistantDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 36)
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 72)
  description: string;
  @IsOptional()
  @IsString()
  @Length(1, 9)
  version: string;
  @IsOptional()
  @IsString()
  icon: string;
  @IsNotEmpty()
  @IsArray()
  assistants: ReturnAssistantDTO[];
}

export class ReturnAssistantDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 36)
  assistant: string;
  @IsNotEmpty()
  @IsArray()
  rules: RuleDTO[];
}

class RuleDTO {
  @IsNotEmpty()
  @IsString()
  @Length(3, 36)
  name: string;
  @IsNotEmpty()
  @IsObject()
  config: any;
}

export class GetAsstResponseDTO {
  dir: boolean;
  downloaded: boolean;
}
