import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoConteudoEntity, ArquivoEntity } from 'src/arquivos/entities';
import {
  ArquivoConteudoSerializer,
  ArquivoSerializer,
} from 'src/arquivos/serializers';
import { ArquivosService } from 'src/arquivos/services';
import { AlfrescoMiddleware } from 'src/config/alfresco/middleware';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import {
  SolicitacaoArquivoEntity,
  SolicitacaoEntity,
} from 'src/solicitacoes/entities';
import { SolicitacoesService } from 'src/solicitacoes/services';
import { WebController } from './controllers';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([
      SolicitacaoEntity,
      SolicitacaoArquivoEntity,
      ArquivoEntity,
      ArquivoConteudoEntity,
    ]),
  ],
  controllers: [WebController],
  providers: [
    AlfrescoAuthService,
    AlfrescoNodeService,
    ArquivosService,
    ArquivoSerializer,
    ArquivoConteudoSerializer,
    SolicitacoesService,
  ],
})
export class WebModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlfrescoMiddleware).forRoutes(WebController);
  }
}
