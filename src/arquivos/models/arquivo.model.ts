import { ApiProperty } from '@nestjs/swagger';

export class ArquivoModel {
  id: string;

  @ApiProperty({
    required: true,
    type: 'string',
    format: 'binary',
    example: 'Selecione um arquivo',
  })
  conteudo: Express.Multer.File;

  @ApiProperty({ required: true, example: 'ESCOLA ABC' })
  organizacao: string;

  @ApiProperty({ required: true, example: 'ABC Aluno' })
  sistema: string;

  @ApiProperty({
    required: true,
    example: 'GERENCIAMENTO DE DOCUMENTOS COM ALFRESCO ECM',
  })
  nome: string;

  @ApiProperty({ required: true, example: 'pdf' })
  tipo: string;
}
