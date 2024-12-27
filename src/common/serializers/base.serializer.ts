import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserModel } from 'src/authentication/models';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../entities';
import { BaseModel } from '../models';

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
      entity.usuarioCriacao = user.sub;
    }
    entity.usuarioAtualizacao = user.sub;
    return entity;
  }
}
