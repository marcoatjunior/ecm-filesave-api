import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  usuarioCriacao: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dataHoraCriacao: Date;

  @Column({ type: 'varchar', length: 300 })
  usuarioAtualizacao: string;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  dataHoraAtualizacao: Date;
}
