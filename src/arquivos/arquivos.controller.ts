import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArquivosService } from './arquivos.service';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly service: ArquivosService) {}

  @Get()
  @ApiOperation({ summary: 'Lista arquivos no repositório Alfresco ECM' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Consulta arquivo no repositório Alfresco ECM' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }
}
