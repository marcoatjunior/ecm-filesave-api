import { ApiProperty } from '@nestjs/swagger';

export class Arquivo {
  @ApiProperty({ required: true, type: 'string' })
  nome: string;

  @ApiProperty({ required: true, type: 'string', format: 'binary' })
  arquivo: Express.Multer.File;
}
