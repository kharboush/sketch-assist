import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateAssistantDTO, ReturnAssistantDTO } from './assistant.dto';
import { AssistantService } from './assistant.service';

@Controller()
export class AssistantController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  public async getAllRules(): Promise<ReturnAssistantDTO[]> {
    return this.assistantService.getAllRules();
  }

  @Post()
  public async createAssistant(
    @Body() body: CreateAssistantDTO,
    @Res() res: Response,
  ): Promise<string> {
    return this.assistantService.createAssistant(body, res);
  }
}
