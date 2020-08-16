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
    try {
      await this.commandService.generateAssistantRules();
      await this.commandService.generateAssistantPkg(requestBody);
      const fileLocation = await this.commandService.generateAssistantFile();
      res.download(fileLocation);
      await this.commandService.runCleanup();
    } catch (err) {
      return err;
    }
  }

  public async getCoreRules() {
    try {
      await this.commandService.downloadRepo('sketch-hq/sketch-assistants');
    } catch (err) {
      return err;
    }
  }
}
