import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthenticationModule } from './authentication';
import { configService } from './config';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthenticationModule,
    ArquivosModule,
    SolicitacoesModule,
  ],
})
export class AppModule {}
