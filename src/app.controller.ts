import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import {
  CreateAssistantDTO,
  ReturnAssistantDTO,
} from './assistant/assistant.dto';
import { AssistantService } from './assistant/assistant.service';

@Controller()
export class AppController {
  constructor(private readonly assistantService: AssistantService) {}

  @Get()
  public async getAllRules(): Promise<ReturnAssistantDTO[]> {
    return this.assistantService.getAllRules();
  }

  @Get('/assistant/:id')
  public async getAssistant(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    const foundCheck = await this.assistantService.getAssistant(res, id);

    if (foundCheck && !foundCheck.folder) {
      throw new NotFoundException('Assistant not found!');
    } else if (foundCheck && !foundCheck.file) {
      throw new ForbiddenException('Assistant still being processed...');
    }
  }

  @Post('assistant')
  public async createAssistant(
    @Body() body: CreateAssistantDTO,
  ): Promise<string> {
    return this.assistantService.createAssistant(body);
  }
}
