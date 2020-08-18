import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AssistantService } from './assistant/assistant.service';
import { CommandService } from './assistant/command.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AssistantService, CommandService],
})
export class AppModule {}
