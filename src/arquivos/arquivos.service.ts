import { Injectable } from '@nestjs/common';

@Injectable()
export class ArquivosService {
  lista() {
    return `This action returns all arquivos`;
  }

  consulta(id: number) {
    return `This action returns a #${id} arquivo`;
  }
}
