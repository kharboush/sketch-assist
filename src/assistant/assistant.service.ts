import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CommandService } from '../command.service';
import { CreateAssistantDTO, ReturnAssistantDTO } from './assistant.dto';
import { allRules } from './origin/statics';

@Injectable()
export class AssistantService {
  constructor(private readonly commandService: CommandService) {}

  public async createAssistant(requestBody: CreateAssistantDTO): Promise<any> {
    const createdId = `a-${uuidv4()}`;
    try {
      await this.commandService.generateAssistantDir(createdId);
      const returnAssistantRules = await this.commandService.generateAssistantRules(
        requestBody,
      );
      const returnAssistantInfo = await this.commandService.generateAssistantPkg(
        requestBody,
      );
      this.commandService.generateAssistantFile();
      return { ...returnAssistantInfo, rules: returnAssistantRules };
    } catch (err) {
      console.error(err);
    }
  }

  public async getAssistant(res: Response, id: string): Promise<any> {
    let foundPath = { folder: '', file: '' };
    let downloaded = false;

    try {
      foundPath = { ...(await this.commandService.getFilePath(id)) };
      if (!foundPath?.folder || !foundPath?.file) {
        return foundPath;
      }

      res.download(foundPath.file);
      downloaded = true;
    } catch (err) {
      console.error(err);
    } finally {
      if (downloaded) {
        setTimeout(() => {
          this.commandService.deleteLocation(foundPath.folder);
        }, 30000);
      }
    }
  }

  public async getAllRules(): Promise<ReturnAssistantDTO[]> {
    return allRules;
  }
}
