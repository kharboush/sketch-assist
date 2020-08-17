import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { CommandService } from '../command.service';
import { CreateAssistantDTO, ReturnAssistantDTO } from './assistant.dto';
import { RULES } from './origin/statics';

@Injectable()
export class AssistantService {
  constructor(private readonly commandService: CommandService) {}

  public async createAssistant(
    requestBody: CreateAssistantDTO,
    res: Response,
  ): Promise<any> {
    try {
      await this.commandService.generateAssistantRules(requestBody);
      await this.commandService.generateAssistantPkg(requestBody);
      const fileLocation = await this.commandService.generateAssistantFile();
      res.download(fileLocation);
    } catch (err) {
      console.error(err);
    } finally {
      this.commandService.runCleanup();
    }
  }

  public async getAllRules(): Promise<ReturnAssistantDTO[]> {
    return RULES;
  }
}
