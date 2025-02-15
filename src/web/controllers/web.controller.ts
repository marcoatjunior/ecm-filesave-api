import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArquivosService } from 'src/arquivos/services';
import { Public } from 'src/authentication/decorators';
import { web } from 'src/common/resources';
import { SolicitacoesService } from 'src/solicitacoes/services';
import { WebArquivo, WebSolicitacao } from '../models';

@ApiTags('Web')
@Controller('web')
export class WebController {
  constructor(
    private solicitacoesService: SolicitacoesService,
    private arquivosService: ArquivosService,
  ) {}

  @Get('solicitacoes/:id')
  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({ summary: web.consultaSolicitacao })
  async consulta(@Param('id') id: string): Promise<WebSolicitacao> {
    const solicitacao = await this.solicitacoesService.consulta(id);
    return {
      id: solicitacao.id,
      organizacao: solicitacao.organizacao,
      sistema: solicitacao.sistema,
      dataHoraExpiracao: solicitacao.dataHoraExpiracao,
      arquivos: solicitacao.arquivos.map((arquivo) => ({
        id: arquivo.id,
        nome: arquivo.informacoes.nome,
        tipo: arquivo.informacoes.tipo,
        usuarioCriacao: solicitacao.usuarioCriacao,
      })),
    };
  }

  @Post('arquivos')
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: web.incluiArquivosSolicitacao })
  @UseInterceptors(FileInterceptor('conteudo'))
  async inclui(@Body() model: WebArquivo): Promise<void> {
    const arquivo = this.montaRequisicaoArquivo(model);
    await this.arquivosService.salva(arquivo as any);
  }

  private montaRequisicaoArquivo(model: WebArquivo) {
    return {
      nome: model.nome,
      numeroBytes: model.numeroBytes,
      conteudo: {
        organizacao: model.organizacao,
        sistema: model.sistema,
        conteudo: model.conteudo,
        informacoes: {
          nome: model.nome,
          tipo: model.tipo,
        },
        usuarioCriacao: model.usuarioCriacao,
        usuarioAtualizacao: model.usuarioCriacao,
      },
      usuarioCriacao: model.usuarioCriacao,
      usuarioAtualizacao: model.usuarioCriacao,
    };
  }
}
