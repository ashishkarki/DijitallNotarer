import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("App")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Return a greeting message' })
  @ApiResponse({ status: 200, description: 'Returns a greeting message.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
