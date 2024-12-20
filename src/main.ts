import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configuraSwagger } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIXO);
  app.enableCors();
  configuraSwagger(app);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
