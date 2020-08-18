import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import { CreateAssistantDTO } from './assistant/assistant.dto';
import { pkgTemplate } from './assistant/origin/statics';

@Injectable()
export class CommandService {
  execute = util.promisify(require('child_process').exec);
  write = fs.promises.writeFile;
  generatedId = '';
  generatedDir = '';
  configLocation = '';

  public async generateAssistantDir(generatedId: string): Promise<void> {
    this.generatedId = generatedId;
    this.generatedDir = `src/assistant/generated/${this.generatedId}`;
    this.configLocation = `./${this.generatedDir}/src/config.ts`;

    await this.execute(`cp -r src/assistant/origin ${this.generatedDir}`);
  }

  public async generateAssistantPkg(
    requestBody: CreateAssistantDTO,
  ): Promise<any> {
    const parsedFileName = this.parseTitleToFileName(requestBody.name);

    const userPref = {
      name: parsedFileName,
      version: requestBody.version || '1.0.0',
      'sketch-assistant': {
        title: requestBody.name || 'Untitled Sketch Assistant',
        description: requestBody.description || 'No description provided.',
        icon: requestBody.icon || '',
      },
    };
    const options = { ...pkgTemplate, ...userPref };

    try {
      console.log('Generating package.json file...');
      await this.write(
        `./${this.generatedDir}/package.json`,
        JSON.stringify(options),
      );
      console.log('package.json created');
    } catch (err) {
      console.error(err.message);
    }
    return { id: this.generatedId, ...userPref };
  }

  public async generateAssistantRules(
    requestBody: CreateAssistantDTO,
  ): Promise<any> {
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
export const rules = ${JSON.stringify(populatedRules)};
        `,
      );
      console.log('config file created');
      return populatedRules;
    } catch (err) {
      console.error(err.message);
    }
  }

  public async generateAssistantFile(): Promise<string> {
    try {
      console.log('Generating assistant file...');
      const { stdout: cmdReponse } = await this.execute(
        `cd ${this.generatedDir} && npm run package-tarball`,
      );
      console.log(cmdReponse);
      const { stdout: fileCreatedName } = await this.execute(
        `ls ${this.generatedDir}/out`,
      );
      console.log('File created:', fileCreatedName);
      return this.getFilePath(cmdReponse);
    } catch (err) {
      console.error(err.message);
    }
  }

  // public async runCleanup(): Promise<void> {
  //   try {
  //     await this.execute(`rm -rf ${this.generatedDir}`);
  //     'Directory cleaned up!';
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // public async downloadRepo(repoName: string): Promise<void> {
  //   const url = `https://api.github.com/repos/${repoName}/tarball`;
  //   const fileName = `${repoName.split('/')[1]}.tar.gz`;
  //   const fileLocation = `./${this.generatedDIr}/out/${fileName}`;
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

  public async getFilePath(id: string): Promise<any> {
    const generatedDir = `src/assistant/generated`;
    const dirToSearch = `${generatedDir}/${id}`;
    const loc = {
      file: '',
      folder: '',
    };

    const { stdout: cmdResponseFolderCheck } = await this.execute(
      `ls ${generatedDir}`,
    );
    const responseArray = cmdResponseFolderCheck.split('\n');

    if (!responseArray.includes(id)) {
      return loc;
    } else {
      loc.folder = dirToSearch;
      const { stdout: cmdReponseFileCheck } = await this.execute(
        `ls ${dirToSearch}/out`,
      );
      const responseArray = cmdReponseFileCheck.split('\n');
      const foundFile = responseArray.find(file => file.includes('tgz'));

      if (!foundFile) {
        return loc;
      } else {
        loc.file = `${dirToSearch}/out/${foundFile}`;
      }
    }
    return loc;
  }

  public async deleteLocation(location: string): Promise<void> {
    await this.execute(`rm -rf ${location}`);
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
