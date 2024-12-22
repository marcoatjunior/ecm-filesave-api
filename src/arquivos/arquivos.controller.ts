import {
  Body,
  Controller,
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
import { Arquivo } from './entities/arquivo.entity';

@ApiTags('Arquivos')
@Controller('arquivos')
export class ArquivosController {
  constructor(private readonly service: AlfrescoNodeService) {}

  @Get(':id')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.consulta })
  consulta(@Param('id') id: string): Observable<Node> {
    return this.service.consulta(id);
  }

  @Get(':id/download')
  @Header('Content-Type', 'application/pdf')
  @Permissions(permissoesArquivos.consulta)
  @ApiOperation({ summary: arquivos.download })
  async download(@Param('id') id: string): Promise<StreamableFile> {
    const stream = await this.service.download(id);
    return new StreamableFile(stream);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permissions(permissoesArquivos.inclui)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: arquivos.upload })
  @UseInterceptors(FileInterceptor('arquivo'))
  async upload(
    @Body() dto: Arquivo,
    @UploadedFile(arquivoPdfValidator)
    arquivo: Express.Multer.File,
  ): Promise<Node> {
    const { originalname, buffer } = arquivo;
    const { entry } = await this.service.upload(originalname);
    return this.service.atualizaConteudo(entry.id, buffer);
  }
}
