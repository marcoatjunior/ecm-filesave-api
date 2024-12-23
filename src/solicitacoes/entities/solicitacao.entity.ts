import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SOLICITACAO' })
export class SolicitacaoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID da solicitação (PK)',
  })
  id: string;

  @Column({
    name: 'ORGANIZACAO',
    length: 100,
    comment: 'Nome da organização que a solicitação ficará vinculada',
  })
  organizacao: string;

  @Column({
    name: 'SISTEMA',
    length: 100,
    comment: 'Nome do sistema que solicitou o envio de arquivos',
  })
  sistema: string;

  @Column({
    name: 'DATA_HORA_EXPIRACAO',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data e hora de expiração da solicitação',
  })
  dataHoraTransmissao: Date;
}
