import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import CoreAssistant from '@sketch-hq/sketch-core-assistant';
import { Response } from 'express';
import { AppService } from './assistant.service';
import { CreateAssistantDTO } from '../common/assistant.dto';

@Controller()
export class AssistantController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getStuff() {
    console.log(CoreAssistant);
  }

  @Post()
  public async getAssistant(
    @Body() body: CreateAssistantDTO,
    @Res() res: Response,
  ): Promise<string> {
    return this.appService.getAssistant(body, res);
  }
}
