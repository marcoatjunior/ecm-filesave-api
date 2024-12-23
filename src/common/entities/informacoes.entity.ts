import { Column } from 'typeorm';

export abstract class InformacoesEntity {
  @Column({
    name: 'NOME',
    length: 300,
    comment: 'Nome do arquivo para o sistema cliente',
  })
  nome: string;

  @Column({
    name: 'TIPO',
    length: 50,
    comment: 'Tipo do arquivo para o sistema cliente',
  })
  tipo: string;

  @Column({
    name: 'EXTRAS',
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    comment: 'Propriedades extras (JSON) do arquivo para o sistema cliente',
  })
  extras: Array<any>;
}
