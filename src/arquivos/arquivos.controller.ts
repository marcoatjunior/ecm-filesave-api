import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/authentication/decorators';
import { ArquivosService } from './arquivos.service';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly service: ArquivosService) {}

  @Get()
  @Permissions('lista:arquivos')
  @ApiOperation({ summary: 'Lista arquivos no repositório Alfresco ECM' })
  lista() {
    return this.service.lista();
  }
}
