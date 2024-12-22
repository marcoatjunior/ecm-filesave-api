import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Permissions } from 'src/authentication/decorators';
import { Node } from 'src/config/alfresco/interfaces';
import { AlfrescoNodeService } from 'src/config/alfresco/services';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly service: AlfrescoNodeService) {}

  @Get(':id')
  @Permissions('consulta:arquivos')
  @ApiOperation({ summary: 'Consulta arquivo no repositório Alfresco ECM' })
  consulta(@Param('id') id: string): Observable<Node> {
    return this.service.consulta(id);
  }
}
