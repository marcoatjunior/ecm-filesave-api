import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity {
  @Column({
    name: 'USUARIO_CRIACAO',
    length: 300,
    comment: 'ID de autenticação do usuário de criação do registro',
  })
  usuarioCriacao: string;

  @CreateDateColumn({
    name: 'DATA_HORA_CRIACAO',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora de criação do registro',
  })
  dataHoraCriacao: Date;

  @Column({
    name: 'USUARIO_ATUALIZACAO',
    length: 300,
    comment: 'ID de autenticação do usuário de atualização do registro',
  })
  usuarioAtualizacao: string;

  @UpdateDateColumn({
    name: 'DATA_HORA_ATUALIZACAO',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    comment: 'Data e hora de atualização do registro',
  })
  dataHoraAtualizacao: Date;
}
