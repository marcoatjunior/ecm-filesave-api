import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';
import { api } from 'src/common/resources';

const basePath: string = 'docs';
const audienceUrl: string = `audience=${process.env.AUTH0_AUDIENCE}`;
const authorizationUrl: string = `${process.env.AUTH0_DOMAIN}authorize?${audienceUrl}`;
const redirectUrl: string = `${process.env.AUTH0_AUDIENCE}/${basePath}/oauth2-redirect.html`;

const securityScheme: SecuritySchemeObject = {
  type: 'oauth2',
  flows: {
    implicit: {
      authorizationUrl,
      tokenUrl: `${process.env.AUTH0_AUDIENCE}`,
      scopes: {
        openid: 'Open Id',
        profile: 'Profile',
        email: 'E-mail',
      },
    },
  },
  scheme: 'bearer',
  bearerFormat: 'JWT',
  in: 'header',
};

const uiOptions: SwaggerUiOptions = {
  initOAuth: {
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    scopes: ['openid', 'profile', 'email'],
  },
  oauth2RedirectUrl: redirectUrl,
  defaultModelsExpandDepth: -1,
};

const documentOptions: SwaggerDocumentOptions = {
  autoTagControllers: false,
  ignoreGlobalPrefix: true,
};

const customOptions: SwaggerCustomOptions = {
  customSiteTitle: api.titulo,
  swaggerOptions: uiOptions,
};

const builder: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
  .setTitle(api.titulo)
  .setDescription(api.descricao)
  .setVersion('0.6.0')
  .addServer(process.env.AUTH0_AUDIENCE)
  .addSecurityRequirements('Auth0')
  .addOAuth2(securityScheme, 'Auth0')
  .build();

const criaDocumento = (app: INestApplication): OpenAPIObject =>
  SwaggerModule.createDocument(app, builder, documentOptions);

export const configuraSwagger = (app: INestApplication): void =>
  SwaggerModule.setup(
    `${process.env.API_PREFIXO}/${basePath}`,
    app,
    criaDocumento(app),
    customOptions,
  );
