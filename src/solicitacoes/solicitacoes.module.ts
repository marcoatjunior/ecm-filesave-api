import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitacoesController } from './controllers';
import { SolicitacaoArquivoEntity, SolicitacaoEntity } from './entities';
import {
  SolicitacaoArquivoSerializer,
  SolicitacaoSerializer,
} from './serializers';
import { SolicitacoesService } from './services';

@Module({
  imports: [
    TypeOrmModule.forFeature([SolicitacaoEntity, SolicitacaoArquivoEntity]),
  ],
  controllers: [SolicitacoesController],
  providers: [
    SolicitacoesService,
    SolicitacaoSerializer,
    SolicitacaoArquivoSerializer,
  ],
})
export class SolicitacoesModule {}
