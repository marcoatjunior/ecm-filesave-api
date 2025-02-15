import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthenticationModule } from './authentication';
import { BatchModule } from './batch/batch.module';
import { configService } from './config';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { WebModule } from './web/web.module';

@Module({
  controllers: [AppController],
  imports: [
    ArquivosModule,
    AuthenticationModule,
    BatchModule,
    SolicitacoesModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    WebModule,
  ],
})
export class AppModule {}
