import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import {
  SecuritySchemeObject,
  ServerVariableObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { api } from 'src/common/resources';

const securityScheme: SecuritySchemeObject = {
  in: 'header',
  type: 'openIdConnect',
  openIdConnectUrl: `${process.env.AUTH0_ISSUER_URL}/.well-known/openid-configuration`,
};

const serverVariables: Record<string, ServerVariableObject> = {
  protocolo: { enum: ['http', 'https'], default: 'http' },
};

export const swaggerConfiguration: Omit<OpenAPIObject, 'paths'> =
  new DocumentBuilder()
    .setTitle(api.titulo)
    .setDescription(api.descricao)
    .setVersion(api.versao)
    .addServer('{protocolo}://ecm-filesave.com/api', null, serverVariables)
    .addSecurity('openId', securityScheme)
    .build();
