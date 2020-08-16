import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CommandService } from '../command.service';
import { CreateAssistantDTO } from '../common/assistant.dto';

@Injectable()
export class AssistantService {
  constructor(private readonly commandService: CommandService) {}

  public async getAssistant(
    requestBody: CreateAssistantDTO,
    res: Response,
  ): Promise<any> {
    await this.commandService.generatePkg(requestBody);

    const fileLocation = await this.commandService.generateFile();

    res.download(fileLocation);

    await this.commandService.runCleanup();
  }
}
