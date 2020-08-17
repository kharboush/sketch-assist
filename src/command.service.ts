import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as util from 'util';
import { PACKAGE_JSON, TEMPLATE_DIR } from './assistant/origin/statics';
import { CreateAssistantDTO } from './assistant/assistant.dto';

@Injectable()
export class CommandService {
  execute = util.promisify(require('child_process').exec);
  configLocation = `./${TEMPLATE_DIR}/src/config.ts`;
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
      console.log('Generating package.json file...');
      await this.write(
        `./${TEMPLATE_DIR}/package.json`,
        JSON.stringify(options),
      );
      console.log('package.json created');
    } catch (err) {
      console.error(err.message);
    }
  }

  public async generateAssistantRules(
    requestBody: CreateAssistantDTO,
  ): Promise<void> {
    const populatedRules = requestBody.assistants.reduce((rules, req) => {
      req.rules.forEach(rule => {
        rules[`${req.assistant}/${rule.name}`] = rule.config;
      });

      return rules;
    }, {});

    try {
      console.log('Generating config file...');
      await this.write(
        this.configLocation,
        `
const CoreAssistant = require('@sketch-hq/sketch-core-assistant');
export const extendedAssistants = [CoreAssistant];
export const rules = JSON.parse('${JSON.stringify(populatedRules)}');
        `,
      );
      console.log('config file created');
    } catch (err) {
      console.error(err.message);
    }
  }

  public async generateAssistantFile(): Promise<string> {
    try {
      console.log('Generating assistant file...');
      const { stdout: cmdReponse } = await this.execute(
        `cd ${TEMPLATE_DIR} && npm run package-tarball`,
      );
      console.log(cmdReponse);
      const { stdout: stdout3 } = await this.execute(
        `cd ${TEMPLATE_DIR}/out && ls`,
      );
      console.log('File created:', stdout3);
      return this.getFilePath(cmdReponse);
    } catch (err) {
      console.error(err.message);
    }
  }

  public async runCleanup(): Promise<void> {
    try {
      const { stdout } = await this.execute(
        `cd ${TEMPLATE_DIR} && rm -rf dist && rm -rf node_modules && rm out/* && rm package.json`,
      );
      console.log('Cleanup log: ', stdout);
      await fs.promises.unlink(this.configLocation);
      console.log('User config cleared', this.configLocation);
    } catch (err) {
      console.error(err.message);
    }
  }

  // public async downloadRepo(repoName: string): Promise<void> {
  //   const url = `https://api.github.com/repos/${repoName}/tarball`;
  //   const fileName = `${repoName.split('/')[1]}.tar.gz`;
  //   const fileLocation = `./${TEMPLATE_DIR}/out/${fileName}`;
  //   const createFile = fs.createWriteStream(fileLocation);

  //   const writeToFile = async response => {
  //     await response.data.pipe(createFile);
  //     return new Promise((resolve, reject) => {
  //       createFile.on('finish', () => resolve(true));
  //       createFile.on('error', (err: Error) => reject(err));
  //     });
  //   };

  //   try {
  //     const response = await axios({
  //       url,
  //       method: 'GET',
  //       responseType: 'stream',
  //     });
  //     await writeToFile(response);
  //     await this.unzipFile(fileLocation);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // private async unzipFile(location: string) {
  //   return location;
  // }

  private getFilePath(cmdResponse: string): string {
    const responseArray: string[] = cmdResponse.split('\n');
    const fileName = responseArray.find(txt => txt.includes('.tgz'));
    return `${TEMPLATE_DIR}/out/${fileName}`;
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
