import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { api } from 'src/common/resources';

export const swaggerConfiguration: Omit<OpenAPIObject, 'paths'> =
  new DocumentBuilder()
    .setTitle(api.titulo)
    .setDescription(api.descricao)
    .setVersion(api.versao)
    .setTermsOfService("teste docker watch")
    .build();
