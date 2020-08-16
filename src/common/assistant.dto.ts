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
}
