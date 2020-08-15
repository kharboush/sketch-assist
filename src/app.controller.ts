import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public async getAssistant(@Res() res: Response): Promise<string> {
    return this.appService.getAssistant(res);
  }
}
