import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication';
import { ArquivosModule } from './arquivos/arquivos.module';

@Module({
  imports: [AuthenticationModule, ArquivosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
