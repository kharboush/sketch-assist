import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AssistantService } from './assistant/assistant.service';
import { CommandService } from './assistant/command.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AssistantService, CommandService],
})
export class AppModule { }
