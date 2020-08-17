import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
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

  @Get('/assistant/:id')
  public async getAssistant(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    const foundCheck = await this.assistantService.getAssistant(res, id);

    if (foundCheck && !foundCheck.folder) {
      throw new NotFoundException('Assistant not found!');
    } else if (foundCheck && !foundCheck.file) {
      throw new UnauthorizedException('Resource still being processed...');
    }
  }

  @Post('assistant')
  public async createAssistant(
    @Body() body: CreateAssistantDTO,
  ): Promise<string> {
    return this.assistantService.createAssistant(body);
  }
}
