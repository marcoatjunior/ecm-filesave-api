import { Controller, Get } from '@nestjs/common';
import { Public } from './authentication/decorators';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller()
@ApiExcludeController()
export class AppController {

  @Get()
  @Public()
  getStatus(): string {
    return 'online';
  }
}
