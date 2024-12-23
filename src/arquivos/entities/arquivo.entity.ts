import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { SituacaoEcmEnum } from '../enums';

@Entity({ name: 'ARQUIVO' })
export class ArquivoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID do arquivo (PK)',
  })
  id: string;

  @Column({
    name: 'ID_ECM',
    length: 80,
    comment: 'Identificador do arquivo no ECM',
    nullable: true,
  })
  idEcm: string;

  @Column({
    name: 'NOME',
    length: 300,
    comment: 'Nome do arquivo',
  })
  nome: string;

  @Column({
    name: 'SITUACAO',
    type: 'enum',
    enum: SituacaoEcmEnum,
    default: SituacaoEcmEnum.PENDENTE,
    comment: 'Situação de envio do arquivo no ECM',
  })
  situacao: SituacaoEcmEnum;

  @Column({
    name: 'NUMERO_BYTES',
    comment: 'Tamanho do arquivo em bytes',
    type: 'numeric',
    precision: 20,
    nullable: true,
  })
  numeroBytes: number;

  @Column({
    name: 'DATA_HORA_TRANSMISSAO',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data e hora da transmissão do arquivo ao ECM',
  })
  dataHoraTransmissao: Date;
}
