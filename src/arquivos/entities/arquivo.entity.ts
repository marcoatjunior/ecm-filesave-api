import { BaseEntity } from 'src/common/entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'arquivo' })
export class Arquivo extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Column({ type: 'number', length: 9 })
  id: number;

  @Column({ type: 'varchar', length: 80 })
  idEcm: string;

  @Column({ type: 'varchar', length: 300 })
  nome: string;
}
