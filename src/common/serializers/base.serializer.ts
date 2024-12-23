import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { UserModel } from 'src/authentication/models';
import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { BaseEntity } from '../entities';
import { BaseModel } from '../models';

@Injectable({ scope: Scope.REQUEST })
export class BaseSerializer<S extends BaseModel, T extends BaseEntity> {
  constructor(@Inject(REQUEST) private readonly request: any) {}

  fromDto(source: S): T {
    const target = {} as T;
    this.incluiControles(target);
    return target;
  }

  @BeforeInsert()
  @BeforeUpdate()
  async incluiControles(target: T): Promise<T> {
    const user = this.request.user as UserModel;
    if (!target.usuarioCriacao) {
      target.usuarioCriacao = user.sub;
    }
    target.usuarioAtualizacao = user.sub;
    return target;
  }
}
