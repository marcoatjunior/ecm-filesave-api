import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationGuard } from './authentication/guards';
import { configuraSwagger } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(process.env.API_PREFIXO);

  const reflector = app.get(Reflector);
  app.useGlobalGuards(new AuthenticationGuard(reflector));

  app.enableCors();

  configuraSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
