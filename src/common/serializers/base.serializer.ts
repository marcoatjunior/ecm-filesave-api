import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserModel } from 'src/authentication/models';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../entities';
import { BaseModel } from '../models';
import { BatchConstants } from 'src/batch/constants';

@Injectable({ scope: Scope.REQUEST })
export class BaseSerializer<M extends BaseModel, E extends BaseEntity> {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  fromModel(model: M): E {
    const entity = {} as E;
    this.incluiControles(entity);
    return entity;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async incluiControles(entity: E): Promise<E> {
    const user = this.request.user as UserModel;
    if (!entity.usuarioCriacao) {
      entity.usuarioCriacao = !!user?.sub
        ? user.sub
        : BatchConstants.USUARIO_BATCH;
    }
    entity.usuarioAtualizacao = !!user?.sub
      ? user.sub
      : BatchConstants.USUARIO_BATCH;
    return entity;
  }
}
