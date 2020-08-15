import { Injectable } from '@nestjs/common';
import { TEMPLATE_DIR } from './common';

@Injectable()
export class CliService {
  execute = require('util').promisify(require('child_process').exec);

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
    this.execute(`cd ${TEMPLATE_DIR} && npm run cleanup`);
  }

  private getFilePath(cmdResponse: string): string {
    const responseMessage: string[] = cmdResponse.split('\n');
    const fileName = responseMessage.find(txt => txt.includes('.tgz'));
    return `${TEMPLATE_DIR}/output/${fileName}`;
  }
}
