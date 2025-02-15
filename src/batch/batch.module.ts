import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoConteudoEntity, ArquivoEntity } from 'src/arquivos/entities';
import {
  ArquivosConteudoService,
  ArquivosService,
} from 'src/arquivos/services';
import { AlfrescoMiddleware } from 'src/config/alfresco/middleware';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import {
  SolicitacaoArquivoEntity,
  SolicitacaoEntity,
} from 'src/solicitacoes/entities';
import { SolicitacoesArquivoService, SolicitacoesService } from 'src/solicitacoes/services';
import {
  BatchArquivosController,
  BatchSolicitacoesController,
} from './controllers';
import {
  CargaSolicitacaoService,
  ExclusaoEcmService,
  ExpiracaoSolicitacaoService,
  HigienizacaoEcmService,
  TransmissaoEcmService,
} from './services';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      ArquivoEntity,
      ArquivoConteudoEntity,
      SolicitacaoEntity,
      SolicitacaoArquivoEntity,
    ]),
  ],
  controllers: [BatchArquivosController, BatchSolicitacoesController],
  providers: [
    AlfrescoAuthService,
    AlfrescoNodeService,
    ArquivosConteudoService,
    ArquivosService,
    CargaSolicitacaoService,
    ExclusaoEcmService,
    ExpiracaoSolicitacaoService,
    HigienizacaoEcmService,
    SolicitacoesArquivoService,
    SolicitacoesService,
    TransmissaoEcmService,
  ],
})
export class BatchModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlfrescoMiddleware).forRoutes(BatchArquivosController);
  }
}
