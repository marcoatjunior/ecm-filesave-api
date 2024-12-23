import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { ArquivosModule } from './arquivos/arquivos.module';
import { AuthenticationModule } from './authentication';
import { configService } from './config';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthenticationModule,
    ArquivosModule,
  ],
})
export class AppModule {}
