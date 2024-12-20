import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfiguration } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  SwaggerModule.setup(
    'api/docs',
    app,
    () => SwaggerModule.createDocument(app, swaggerConfiguration),
    {
      swaggerOptions: {
        initOAuth: {
          clientId: process.env.AUTH0_CLIENT_ID,
          clientSecret: process.env.AUTH0_CLIENT_SECRET,
          scopes: ['openid'],
          usePkceWithAuthorizationCodeGrant: true,
        },
        oauth2RedirectUrl:
          'http://localhost:7000/api/docs/oauth2-redirect.html',
      },
    },
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
