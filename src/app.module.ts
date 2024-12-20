import { Module } from '@nestjs/common';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthenticationModule } from './authentication';

@Module({
  imports: [AuthenticationModule, ArquivosModule],
})
export class AppModule {}
