import { Controller, Delete, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/authentication/decorators';
import { batch } from 'src/common/resources';
import { ExpiracaoSolicitacaoService } from '../services';

@ApiTags('Rotinas Batch')
@Controller('batch/solicitacoes')
export class BatchSolicitacoesController {
  constructor(private expiracacaoService: ExpiracaoSolicitacaoService) {}

  @Public()
  @Delete('expiracoes')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: batch.expiracaoSolicitacao })
  atualizaExpiracao(): void {
    this.expiracacaoService.executa();
  }
}
