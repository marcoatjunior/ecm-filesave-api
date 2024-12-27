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
import { arquivos, permissoesArquivos } from 'src/common/resources';
import { arquivoPdfValidator } from 'src/common/validators';
import { ArquivoEntity } from '../entities';
import { ArquivoModel } from '../models';
import { ArquivoConteudoSerializer, ArquivoSerializer } from '../serializers';
import { ArquivosService } from '../services';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(
    private service: ArquivosService,
    private serializer: ArquivoSerializer,
    private conteudoSerializer: ArquivoConteudoSerializer,
  ) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.consulta })
  consulta(@Param('id') id: string): Promise<ArquivoEntity> {
    return this.service.consultaEnviado(id);
  }

  @Get(':id/download')
  @HttpCode(HttpStatus.OK)
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.download })
  @Header('Content-Disposition', 'attachment; filename=arquivo.pdf')
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
    @Body() model: ArquivoModel,
    @UploadedFile(arquivoPdfValidator)
    conteudo: Express.Multer.File,
  ): Promise<string> {
    model.conteudo = conteudo;
    let arquivo = this.serializer.fromModel(model);
    arquivo.conteudo = this.conteudoSerializer.fromModel(model);
    arquivo = await this.service.salva(arquivo);
    return arquivo.id;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @Permissions(permissoesArquivos.exclui)
  @ApiOperation({ summary: arquivos.exclui })
  async exclui(@Param('id') id: string): Promise<void> {
    return this.service.remove(id);
  }
}
