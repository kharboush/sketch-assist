import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';
import { PACKAGE_JSON, RULES, TEMPLATE_DIR } from './assistant/origin/statics';
import { CreateAssistantDTO } from './common/assistant.dto';

@Injectable()
export class CommandService {
  execute = util.promisify(require('child_process').exec);
  write = fs.promises.writeFile;

  public async generateAssistantPkg(
    requestBody: CreateAssistantDTO,
  ): Promise<void> {
    const parsedFileName = this.parseTitleToFileName(requestBody.name);

    const assistantCustomConfig = {
      name: parsedFileName,
      'sketch-assistant': {
        title: requestBody.name || 'Untitled Sketch Assistant',
        description: requestBody.description || 'No description provided.',
        version: '1.0.0',
        icon: '',
      },
    };

    const options = { ...PACKAGE_JSON, ...assistantCustomConfig };

    try {
      await this.write(
        `./${TEMPLATE_DIR}/package.json`,
        JSON.stringify(options),
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  public async generateAssistantRules(): Promise<void> {
    const rules = RULES;

    try {
      await this.write(
        `./${TEMPLATE_DIR}/src/rules.json`,
        `${JSON.stringify(rules)}`,
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  public async generateAssistantFile(): Promise<string> {
    try {
      const { stdout: cmdReponse } = await this.execute(
        `cd ${TEMPLATE_DIR} && npm run package-tarball`,
      );
      return this.getFilePath(cmdReponse);
    } catch (err) {
      console.error(err.message);
    }
  }

  public async runCleanup(): Promise<void> {
    await this.execute(
      `cd ${TEMPLATE_DIR} && rm -rf dist && rm -rf node_modules && rm temp/* && rm package.json`,
    );
  }

  public async downloadRepo(repoName: string): Promise<void> {
    const url = `https://api.github.com/repos/${repoName}/tarball`;
    const fileName = `${repoName.split('/')[1]}.tar.gz`;
    const fileLocation = `./${TEMPLATE_DIR}/temp/${fileName}`;
    const createFile = fs.createWriteStream(fileLocation);

    const writeToFile = async response => {
      await response.data.pipe(createFile);
      return new Promise((resolve, reject) => {
        createFile.on('finish', () => resolve(true));
        createFile.on('error', (err: Error) => reject(err));
      });
    };

    try {
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream',
      });
      await writeToFile(response);
      await this.unzipFile(fileLocation);
    } catch (err) {
      console.error(err.message);
    }
  }

  private async unzipFile(location) {
    // fs.createReadStream(location)
    //   .pipe(tar.extract(`./`))
    //   .on('finish', () => console.log('Done'))
    //   .on('error', err => console.error(err));
  }

  private getFilePath(cmdResponse: string): string {
    const responseArray: string[] = cmdResponse.split('\n');
    const fileName = responseArray.find(txt => txt.includes('.tgz'));
    return `${TEMPLATE_DIR}/temp/${fileName}`;
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
