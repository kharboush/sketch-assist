import { Module } from '@nestjs/common';
import { AssistantController } from './assistant/assistant.controller';
import { AppService } from './assistant/assistant.service';
import { CliService } from './cli.service';

@Module({
  imports: [],
  controllers: [AssistantController],
  providers: [AppService, CliService],
})
export class AppModule {}
