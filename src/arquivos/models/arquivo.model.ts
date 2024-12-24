import { ApiProperty } from "@nestjs/swagger";

export class ArquivoInclusaoModel {
  id: string;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  conteudo: Express.Multer.File;

  @ApiProperty({ required: true })
  organizacao: string;

  @ApiProperty({ required: true })
  sistema: string;

  @ApiProperty({ required: true })
  nome: string;

  @ApiProperty({ required: true })
  tipo: string;

  @ApiProperty({ required: true, format: 'json' })
  extras: Array<any>;
}
