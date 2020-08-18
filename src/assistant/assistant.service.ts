import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateAssistantDTO,
  GetAsstResponseDTO,
  ReturnAssistantDTO,
} from './assistant.dto';
import { CommandService } from './command.service';
import { allRules } from './origin/statics';

@Injectable()
export class AssistantService {
  constructor(private readonly cmdServ: CommandService) {}

  public async createAssistant(reqBody: CreateAssistantDTO): Promise<any> {
    const createdId = `a-${uuidv4()}`;
    try {
      await this.cmdServ.genAsstDirFromId(createdId);
      const asstUserConfig = await this.cmdServ.genAsstPkg(reqBody);
      const asstRules = await this.cmdServ.genAsstRules(reqBody);
      this.cmdServ.genAsstFile();
      return { ...asstUserConfig, rules: asstRules };
    } catch (err) {
      console.error(err);
    }
  }

  public async getAssistant(
    res: Response,
    id: string,
  ): Promise<GetAsstResponseDTO> {
    const status = { dir: false, downloaded: false };
    const dir = `src/assistant/generated/${id}`;
    let foundFile = '';

    try {
      const foundDir = await this.cmdServ.findAsstDirByLoc(dir);

      if (foundDir) {
        status.dir = true;
        foundFile = await this.cmdServ.getAsstFileByLoc(dir);
        if (!foundFile) {
          return status;
        }
      } else {
        return status;
      }

      res.download(foundFile);
      status.downloaded = true;
    } catch (err) {
      console.error(err);
    }

    return status;
  }

  public async getAllRules(): Promise<ReturnAssistantDTO[]> {
    return allRules;
  }
}
