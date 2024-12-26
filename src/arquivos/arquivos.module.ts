import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlfrescoMiddleware } from 'src/config/alfresco/middleware';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import { ArquivosController } from './controllers';
import { ArquivoConteudoEntity, ArquivoEntity } from './entities';
import { ArquivoConteudoSerializer, ArquivoSerializer } from './serializers';
import { ArquivosConteudoService, ArquivosService } from './services';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([ArquivoEntity, ArquivoConteudoEntity]),
  ],
  controllers: [ArquivosController],
  providers: [
    AlfrescoAuthService,
    AlfrescoNodeService,
    ArquivosService,
    ArquivoSerializer,
    ArquivoConteudoSerializer,
  ],
})
export class ArquivosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlfrescoMiddleware).forRoutes(ArquivosController);
  }
}
