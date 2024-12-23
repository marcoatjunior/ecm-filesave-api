import { Module } from '@nestjs/common';
import { SolicitacoesController } from './controllers';

@Module({
  controllers: [SolicitacoesController],
})
export class SolicitacoesModule {}
