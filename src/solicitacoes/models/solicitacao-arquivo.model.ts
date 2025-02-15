import { ApiProperty } from '@nestjs/swagger';

export class SolicitacaoArquivoModel {
  id: string;

  @ApiProperty({
    required: true,
    example: 'GERENCIAMENTO DE DOCUMENTOS COM ALFRESCO ECM',
  })
  nome: string;

  @ApiProperty({ required: true, example: 'pdf' })
  tipo: string;
}
