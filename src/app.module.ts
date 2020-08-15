import { Module } from '@nestjs/common';
import { AssistantController } from './assistant/assistant.controller';
import { AssistantService } from './assistant/assistant.service';
import { CommandService } from './command.service';

@Module({
  imports: [],
  controllers: [AssistantController],
  providers: [AssistantService, CommandService],
})
export class AppModule {}
