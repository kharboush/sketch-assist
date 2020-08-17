import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';
import { PACKAGE_JSON, TEMPLATE_DIR } from './assistant/origin/statics';
import { CreateAssistantDTO } from './assistant/assistant.dto';

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
      version: requestBody.version || '1.0.0',
      'sketch-assistant': {
        title: requestBody.name || 'Untitled Sketch Assistant',
        description: requestBody.description || 'No description provided.',
        icon: requestBody.icon || '',
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

  public async generateAssistantRules(
    requestBody: CreateAssistantDTO,
  ): Promise<void> {
    const configLocation = `./${TEMPLATE_DIR}/src/config.ts`;
    const populatedRules = requestBody.assistants.reduce((rules, req) => {
      req.rules.forEach(rule => {
        rules[`${req.assistant}/${rule.name}`] = rule.config;
      });

      return rules;
    }, {});

    try {
      await fs.promises.unlink(configLocation);
      await this.write(
        configLocation,
        `import CoreAssistant from '@sketch-hq/sketch-core-assistant';
export const extendedAssistants = [CoreAssistant];
export const rules = ${JSON.stringify(populatedRules)};`,
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
    const configLocation = `./${TEMPLATE_DIR}/src/config.ts`;
    try {
      await this.execute(
        `cd ${TEMPLATE_DIR} && rm -rf dist && rm -rf node_modules && rm temp/* && rm package.json`,
      );
      await fs.promises.unlink(configLocation);
      await this.write(
        configLocation,
        `export const extendedAssistants = []; export const rules = {};`,
      );
    } catch (err) {
      console.error(err.message);
    }
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

  private async unzipFile(location: string) {
    return location;
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
