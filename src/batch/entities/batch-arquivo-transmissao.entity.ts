import { AuditableEntity } from 'src/common/entities';
import { SituacaoBatchEnum } from 'src/solicitacoes/enums';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'BATCH_ARQUIVO_TRANSMISSAO' })
export class BatchArquivoTransmissaoEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID da execução da rotina batch de transmissão de arquivos (PK)',
  })
  id: string;

  @Column({
    name: 'DATA_HORA_INICIO',
    type: 'timestamptz',
    comment: 'Data e hora de início da execução da rotina batch',
  })
  dataHoraInicio: Date;

  @Column({
    name: 'DATA_HORA_FIM',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data e hora de fim da execução da rotina batch',
  })
  dataHoraFim: Date;

  @Column({
    name: 'SITUACAO',
    type: 'enum',
    enum: SituacaoBatchEnum,
    nullable: true,
    comment: 'Situação de execução do rotina batch',
  })
  situacao: SituacaoBatchEnum;

  @Column({
    name: 'LOG_EXECUCAO',
    type: 'jsonb',
    array: false,
    default: () => "'[]'",
    comment: 'Log de execução da rotina batch',
  })
  logExecucao: Array<any>;

  @Column(() => AuditableEntity, { prefix: false })
  auditable: AuditableEntity;
}
