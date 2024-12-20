import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  OpenAPIObject,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import {
  SecuritySchemeObject,
  ServerVariableObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';
import { api } from 'src/common/resources';

const localhost: string = `localhost:${process.env.PORT}`;
const basePath: string = 'docs';

const authorizationUrl: string = `${process.env.AUTH0_DOMAIN}/authorize?audience=${process.env.AUTH0_AUDIENCE}`;
const serverUrl: string = `${process.env.AMBIENTE === 'local' ? localhost : process.env.AUTH0_AUDIENCE}`;

const serverVariables: Record<string, ServerVariableObject> = {
  protocolo: { enum: ['http', 'https'], default: 'http' },
};

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
    scopes: ['openid', 'profile', 'email'],
  },
  oauth2RedirectUrl: `http://${serverUrl}/${process.env.API_PREFIXO}/${basePath}/oauth2-redirect.html`,
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
  .setVersion(require('../../../package.json').version || '')
  .addServer(
    `{protocolo}://${serverUrl}/${process.env.API_PREFIXO}`,
    null,
    serverVariables,
  )
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
