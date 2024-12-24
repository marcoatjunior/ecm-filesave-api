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
import { Permissions } from 'src/authentication/decorators';
import { arquivos } from 'src/common/resources';
import { permissoesArquivos } from 'src/common/resources/permissoes.resources';
import { arquivoPdfValidator } from 'src/common/validators';
import { AlfrescoNodeService } from 'src/config/alfresco/services';
import { ArquivoEntity } from '../entities';
import { ArquivoInclusaoModel } from '../models';
import { ArquivosService } from '../services';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private service: ArquivosService) {}

  @Get(':id')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.consulta })
  consulta(@Param('id') id: string): Promise<ArquivoEntity> {
    return this.service.consulta(id);
  }

  @Get(':id/download')
  @Header('Content-Disposition', 'attachment; filename=download.pdf')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.download })
  async download(@Param('id') id: string): Promise<StreamableFile> {
    return await this.service.download(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @Permissions(permissoesArquivos.inclui)
  @ApiOperation({ summary: arquivos.inclui })
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
    this.service.exclui(id);
  }
}
