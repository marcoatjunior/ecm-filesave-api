import { BadRequestException, ParseFilePipeBuilder } from '@nestjs/common';
import { validacoes } from '../resources';

export const arquivoPdfValidator = new ParseFilePipeBuilder()
  .addFileTypeValidator({ fileType: '.(pdf)' })
  .build({
    exceptionFactory: () =>
      new BadRequestException(validacoes.arquivoNaoSuportado),
  });
