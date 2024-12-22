import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AlfrescoMiddleware } from 'src/config/alfresco/middleware';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import { ArquivosController } from './arquivos.controller';

@Module({
  imports: [HttpModule],
  controllers: [ArquivosController],
  providers: [AlfrescoAuthService, AlfrescoNodeService],
})
export class ArquivosModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AlfrescoMiddleware).forRoutes(ArquivosController);
  }
}
