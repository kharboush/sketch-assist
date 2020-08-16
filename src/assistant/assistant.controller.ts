import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateAssistantDTO } from '../common/assistant.dto';
import { AssistantService } from './assistant.service';

@Controller()
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  public async getCoreRules(): Promise<void> {
    return this.assistantService.getCoreRules();
  }

  @Post()
  public async getAssistant(
    @Body() body: CreateAssistantDTO,
    @Res() res: Response,
  ): Promise<string> {
    return this.assistantService.getAssistant(body, res);
  }
}
