import { Controller, Delete, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/authentication/decorators';
import { batch } from 'src/common/resources';
import {
  ExclusaoEcmService,
  HigienizacaoEcmService,
  TransmissaoEcmService,
} from '../services';

@ApiTags('Rotinas Batch')
@Controller('batch/arquivos')
export class BatchArquivosController {
  constructor(
    private transmissaoService: TransmissaoEcmService,
    private higienizacaoService: HigienizacaoEcmService,
    private exclusaoService: ExclusaoEcmService,
  ) {}

  @Public()
  @Put('transmissoes')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: batch.transmissaoEcm })
  transmite(): void {
    this.transmissaoService.executa();
  }

  @Public()
  @Delete('higienizacoes')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: batch.higienizacaoEcm })
  higieniza(): void {
    this.higienizacaoService.executa();
  }

  @Public()
  @Delete('exclusoes')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: batch.exclusaoEcm })
  exclui(): void {
    this.exclusaoService.executa();
  }
}
