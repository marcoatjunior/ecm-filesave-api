import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { Permissions } from 'src/authentication/decorators';
import { arquivos } from 'src/common/resources';
import { permissoesArquivos } from 'src/common/resources/permissoes.resources';
import { arquivoPdfValidator } from 'src/common/validators';
import { Node } from 'src/config/alfresco/interfaces';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { ArquivoInclusaoModel } from '../models';
import { ArquivosConteudoService, ArquivosService } from '../services';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(
    private service: ArquivosService,
    private conteudoService: ArquivosConteudoService,
    private alfrescoService: AlfrescoNodeService,
  ) {}

  @Get(':id')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.consulta })
  consulta(@Param('id') id: string): Observable<Node> {
    return this.alfrescoService.consulta(id);
  }

  @Get(':id/download')
  @Header('Content-Disposition', 'attachment; filename=download.pdf')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.download })
  async download(@Param('id') id: string): Promise<StreamableFile> {
    const stream = await this.alfrescoService.download(id);
    return new StreamableFile(stream);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @Permissions(permissoesArquivos.inclui)
  @ApiOperation({ summary: arquivos.upload })
  @UseInterceptors(FileInterceptor('conteudo'))
  async inclui(
    @Body() dto: ArquivoInclusaoModel,
    @UploadedFile(arquivoPdfValidator)
    conteudo: Express.Multer.File,
  ): Promise<string> {
    return this.service.inclui({ ...dto, conteudo });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(permissoesArquivos.exclui)
  @ApiOperation({ summary: arquivos.exclui })
  exclui(@Param('id') id: string): void {
    this.alfrescoService.exclui(id);
  }
}
