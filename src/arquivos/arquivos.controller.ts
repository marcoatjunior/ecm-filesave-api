import { Controller, Get, Header, Param, StreamableFile } from '@nestjs/common';
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

  @Get(':id/download')
  @Permissions('consulta:arquivos')
  @Header('Content-Type', 'application/pdf')
  @ApiOperation({ summary: 'Download de arquivo no repositório Alfresco ECM' })
  async download(@Param('id') id: string): Promise<StreamableFile> {
    const stream = await this.service.download(id);
    return new StreamableFile(stream);
  }
}
