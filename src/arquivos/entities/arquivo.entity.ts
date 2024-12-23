import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'arquivo' })
export class ArquivoEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @PrimaryColumn()
  id: number;

  @Column({ length: 80 })
  idEcm: string;

  @Column({ length: 300 })
  nome: string;
}
