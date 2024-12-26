import { ApiProperty } from "@nestjs/swagger";

export class SolicitacaoModel {
  id: string;

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
