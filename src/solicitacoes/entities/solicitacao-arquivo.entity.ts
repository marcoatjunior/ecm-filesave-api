import { BaseEntity, InformacoesEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'SOLICITACAO_ARQUIVO' })
export class SolicitacaoArquivoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID da solicitação de arquivo (PK)',
  })
  id: string;

  @Column({
    name: 'ID_SOLICITACAO',
    type: 'uuid',
    comment: 'ID da solicitação na tabela SOLICITACAO',
  })
  idArquivo: string;

  @Column(() => InformacoesEntity, { prefix: false })
  informacoes: InformacoesEntity;
}
