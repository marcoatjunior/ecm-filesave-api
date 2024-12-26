import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArquivoConteudoEntity, ArquivoEntity } from 'src/arquivos/entities';
import { ArquivosService } from 'src/arquivos/services';
import { AlfrescoMiddleware } from 'src/config/alfresco/middleware';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import { BatchArquivosController } from './controllers';
import { TransmissaoEcmService } from './services';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ArquivoEntity, ArquivoConteudoEntity]),
  ],
  controllers: [BatchArquivosController],
  providers: [
    AlfrescoAuthService,
    AlfrescoNodeService,
    ArquivosService,
    TransmissaoEcmService,
  ],
})
export class BatchModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlfrescoMiddleware).forRoutes(BatchArquivosController);
  }
}
