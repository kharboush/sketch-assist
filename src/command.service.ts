import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as util from 'util';
import { PACKAGE_JSON } from './assistant/template/PACKAGE_JSON';
import { CreateAssistantDTO } from './common/assistant.dto';
import { TEMPLATE_DIR } from './common/STATIC';

@Injectable()
export class CommandService {
  execute = util.promisify(require('child_process').exec);
  write = fs.writeFile;

  public async generatePkg(requestBody: CreateAssistantDTO): Promise<void> {
    const parsedFileName = this.parseTitleToFileName(requestBody.name);

    const userConfig = {
      name: parsedFileName,
      'sketch-assistant': {
        title: requestBody.name || 'Untitled Sketch Assistant',
        description: requestBody.description || 'No description provided.',
        icon: '',
      },
    };

    const options = { ...PACKAGE_JSON, ...userConfig };

    try {
      await this.write(
        `./${TEMPLATE_DIR}/package.json`,
        JSON.stringify(options),
      );
    } catch (err) {
      return err;
    }
  }

  public async generateFile(): Promise<string> {
    try {
      const { stdout: cmdReponse } = await this.execute(
        `cd ${TEMPLATE_DIR} && npm run package-tarball`,
      );
      return this.getFilePath(cmdReponse);
    } catch (err) {
      return err;
    }
  }

  public async runCleanup(): Promise<void> {
    this.execute(
      `cd ${TEMPLATE_DIR} && rm -rf dist && rm -rf node_modules && rm output/* && rm package.json`,
    );
  }

  private getFilePath(cmdResponse: string): string {
    const responseArray: string[] = cmdResponse.split('\n');
    const fileName = responseArray.find(txt => txt.includes('.tgz'));
    return `${TEMPLATE_DIR}/output/${fileName}`;
  }

  private parseTitleToFileName(title: string): string {
    return title
      .split(' ')
      .join('-')
      .split(/[^a-zA-Z-]+/g)
      .join('')
      .toLowerCase();
  }
}
