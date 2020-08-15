import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CliService } from './cli.service';

@Injectable()
export class AppService {
  constructor(private readonly cliService: CliService) {}

  public async getAssistant(res: Response): Promise<any> {
    const fileLocation = await this.cliService.generateFile();
    res.download(fileLocation);
    await this.cliService.runCleanup();
  }
}
