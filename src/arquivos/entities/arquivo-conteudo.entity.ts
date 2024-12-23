import { AuditableEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ARQUIVO_CONTEUDO' })
export class ArquivoConteudoEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID do conteúdo do arquivo (PK)',
  })
  id: string;

  @Column({
    name: 'ID_ARQUIVO',
    type: 'uuid',
    comment: 'ID do arquivo na tabela ARQUIVO',
  })
  idArquivo: string;

  @Column({
    name: 'CONTEUDO',
    type: 'bytea',
    comment: 'Conteúdo binário do arquivo',
  })
  conteudo: Buffer;

  @Column({
    name: 'ORGANIZACAO',
    length: 100,
    comment: 'Nome da organização que o arquivo ficará vinculado',
  })
  organizacao: string;

  @Column({
    name: 'SISTEMA',
    length: 100,
    comment: 'Nome do sistema que enviou o arquivo',
  })
  sistema: string;

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

  @Column(() => AuditableEntity, { prefix: false })
  auditable: AuditableEntity;
}
