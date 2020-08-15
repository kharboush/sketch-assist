import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CliService } from '../cli.service';
import { CreateAssistantDTO } from '../common/assistant.dto';

@Injectable()
export class AppService {
  constructor(private readonly cliService: CliService) {}

  public async getAssistant(
    requestBody: CreateAssistantDTO,
    res: Response,
  ): Promise<any> {
    await this.cliService.generateJson(requestBody);

    const fileLocation = await this.cliService.generateFile();

    res.download(fileLocation);

    await this.cliService.runCleanup();
  }
}
