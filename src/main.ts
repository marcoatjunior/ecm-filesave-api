import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfiguration } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('api/docs', app, () =>
    SwaggerModule.createDocument(app, swaggerConfiguration),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
