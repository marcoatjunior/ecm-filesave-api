import { BaseEntity, InformacoesEntity } from 'src/common/entities';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SolicitacaoEntity } from './solicitacao.entity';

@Entity({ name: 'SOLICITACAO_ARQUIVO' })
export class SolicitacaoArquivoEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @PrimaryColumn({
    name: 'ID',
    comment: 'ID da solicitação de arquivo (PK)',
  })
  id: string;

  @Column(() => InformacoesEntity, { prefix: false })
  informacoes: InformacoesEntity;

  @JoinColumn({ name: 'ID' })
  @ManyToOne(() => SolicitacaoEntity, (solicitacao) => solicitacao.arquivos)
  arquivo?: SolicitacaoEntity;
}
