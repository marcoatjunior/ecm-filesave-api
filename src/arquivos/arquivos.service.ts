import { Injectable } from '@nestjs/common';

@Injectable()
export class ArquivosService {
  findAll() {
    return `This action returns all arquivos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} arquivo`;
  }
}
