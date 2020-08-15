import { Injectable } from '@nestjs/common';
import { TEMPLATE_DIR, PACKAGE_JSON } from './common/CONFIG';
import { promises as fs } from 'fs';
import * as util from 'util';
import { CreateAssistantDTO } from './common/assistant.dto';

@Injectable()
export class CliService {
  execute = util.promisify(require('child_process').exec);
  write = fs.writeFile;

  public async generateJson(requestBody: CreateAssistantDTO): Promise<void> {
    const options = { ...PACKAGE_JSON, ...requestBody };
    try {
      await this.write(
        './files/assistant-template/package.json',
        JSON.stringify(options),
      );
    } catch (err) {
      console.error(err);
    }
  }

  public async generateFile(): Promise<string> {
    try {
      const { stdout: cmdReponse } = await this.execute(
        `cd ${TEMPLATE_DIR} && npm run package-tarball`,
      );
      return this.getFilePath(cmdReponse);
    } catch (err) {
      console.error(err);
    }
  }

  public async runCleanup(): Promise<void> {
    this.execute(
      `cd ${TEMPLATE_DIR} && rm -rf dist && rm -rf node_modules && rm output/* && rm package.json`,
    );
  }

  private getFilePath(cmdResponse: string): string {
    const responseMessage: string[] = cmdResponse.split('\n');
    const fileName = responseMessage.find(txt => txt.includes('.tgz'));
    return `${TEMPLATE_DIR}/output/${fileName}`;
  }
}
