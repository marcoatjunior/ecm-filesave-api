import { Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/authentication/decorators';
import { batch } from 'src/common/resources';
import { TransmissaoEcmService } from '../services';

@ApiTags('Batch')
@Controller('batch/arquivos')
export class BatchArquivosController {
  constructor(private transmissaoEcmService: TransmissaoEcmService) {}

  @Public()
  @Post('transmissao')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: batch.transmissaoEcm })
  transmite(): void {
    this.transmissaoEcmService.transmite();
  }
}
