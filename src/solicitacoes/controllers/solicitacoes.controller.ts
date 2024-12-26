import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Permissions } from 'src/authentication/decorators';
import { solicitacoes } from 'src/common/resources';
import { permissoesSolicitacoes } from 'src/common/resources/permissoes.resources';
import { SolicitacaoEntity } from '../entities';
import { SolicitacaoModel } from '../models';
import {
  SolicitacaoArquivoSerializer,
  SolicitacaoSerializer,
} from '../serializers';
import { SolicitacoesService } from '../services';

@ApiTags('Solicitações')
@Controller('solicitacoes')
export class SolicitacoesController {
  constructor(
    private service: SolicitacoesService,
    private serializer: SolicitacaoSerializer,
    private arquivoSerializer: SolicitacaoArquivoSerializer,
  ) {}

  @Get(':id')
  @Permissions(permissoesSolicitacoes.consulta)
  @ApiOperation({ summary: solicitacoes.consulta })
  consulta(@Param('id') id: string): Promise<SolicitacaoEntity> {
    return this.service.consulta(id);
  }

  @Get('ativas/:sistema')
  @Permissions(permissoesSolicitacoes.lista)
  @ApiOperation({ summary: solicitacoes.listaAtivasPorSistema })
  listaAtivas(@Param('sistema') sistema: string): Promise<SolicitacaoEntity[]> {
    return this.service.listaAtivas(sistema);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permissions(permissoesSolicitacoes.inclui)
  @ApiOperation({ summary: solicitacoes.inclui })
  async inclui(
    @Body() model: SolicitacaoModel,
  ): Promise<Pick<SolicitacaoEntity, 'id'>> {
    const solicitacao = this.serializer.fromModel(model);
    solicitacao.arquivo = this.arquivoSerializer.fromModel(model);
    return this.service.salva(solicitacao);
  }
}
