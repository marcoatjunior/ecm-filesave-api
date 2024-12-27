import { BaseEntity, InformacoesEntity } from 'src/common/entities';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArquivoEntity } from './arquivo.entity';

@Entity({ name: 'ARQUIVO_CONTEUDO' })
export class ArquivoConteudoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID do conteúdo do arquivo (PK)',
  })
  id: string;

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

  @Column(() => InformacoesEntity, { prefix: false })
  informacoes: InformacoesEntity;

  @JoinColumn({ name: 'ID' })
  @OneToOne(() => ArquivoEntity, (arquivo) => arquivo.conteudo)
  arquivo: ArquivoEntity;
}
