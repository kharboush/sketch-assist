import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AssistantService } from './providers/assistant.service';
import { CommandService } from './providers/command.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AssistantService, CommandService],
})
export class AppModule { }
