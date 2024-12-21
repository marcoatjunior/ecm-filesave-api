import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthenticationModule } from './authentication';

@Module({
  controllers: [AppController],
  imports: [AuthenticationModule, ArquivosModule],
})
export class AppModule {}
