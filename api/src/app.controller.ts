import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Res
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam
} from '@nestjs/swagger';
import { Response } from 'express';
import { CoreAssistantDTO, CreateAssistantDTO } from './assistant/assistant.dto';
import { AssistantService } from './assistant/assistant.service';

@Controller()
export class AppController {
  constructor(private readonly assistantService: AssistantService) { }

  @Get('assistants')
  @ApiOkResponse({
    description: 'All assistant rules available to use have been returned',
  })
  public async getAllRules(): Promise<CoreAssistantDTO[]> {
    return this.assistantService.getAllRules();
  }

  @Get('/assistants/:id')
  @ApiParam({ name: 'id', example: 'a-97e820a0-6243-4ecd-ba1b-afc2a5909feb' })
  @ApiOkResponse({
    description: 'Assistant has been found and queued for download',
  })
  @ApiForbiddenResponse({
    description: 'The server is still processing the requested assistant',
  })
  @ApiNotFoundResponse({
    description: 'An assistant with that ID was not found',
  })
  public async getAssistant(
    @Res() res: Response,
    @Param('id') id: string,
  ): Promise<void> {
    const response = await this.assistantService.getAssistant(res, id);

    if (response && !response.dir) {
      throw new NotFoundException('Assistant not found!');
    } else if (response && !response.downloaded) {
      throw new ForbiddenException('Assistant still being processed...');
    }
  }

  @Post('assistants')
  @ApiCreatedResponse({
    description: 'Assistant creation queued, returned ID for GET request',
  })
  @ApiBody({ type: CreateAssistantDTO })
  public async createAssistant(
    @Body() body: CreateAssistantDTO,
  ): Promise<string> {
    return this.assistantService.createAssistant(body);
  }
}
