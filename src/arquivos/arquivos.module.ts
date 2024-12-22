import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AlfrescoInterceptor } from 'src/config/alfresco/interceptors';
import {
  AlfrescoAuthService,
  AlfrescoNodeService,
} from 'src/config/alfresco/services';
import { ArquivosController } from './arquivos.controller';

@Module({
  imports: [HttpModule],
  controllers: [ArquivosController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: AlfrescoInterceptor,
    },
    AlfrescoAuthService,
    AlfrescoNodeService,
  ],
})
export class ArquivosModule {}
