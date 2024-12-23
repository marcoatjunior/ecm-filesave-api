import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'ARQUIVO' })
export class ArquivoEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID do arquivo (PK)',
    precision: 10,
  })
  id: number;

  @Column({
    name: 'ID_ECM',
    length: 80,
    comment: 'ID do arquivo no ECM',
  })
  idEcm: string;

  @Column({
    name: 'NOME',
    length: 300,
    comment: 'Nome do arquivo',
  })
  nome: string;

  @Column({
    name: 'NUMERO_BYTES',
    comment: 'Tamanho do arquivo em bytes',
    type: 'numeric',
    precision: 20,
  })
  numeroBytes: number;

  @Column({
    name: 'DATA_HORA_TRANSMISSAO',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data e hora da transmissão do arquivo ao ECM',
  })
  dataHoraTransmissao: Date;

  @Column(() => BaseEntity, { prefix: false })
  persistable: BaseEntity;
}
