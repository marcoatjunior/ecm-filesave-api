import { api } from 'src/common/resources';
import { swaggerConfiguration } from './swagger.config';

describe('SwaggerConfig', () => {
  it('Deve retornar informações do Swagger', async () => {
    const { info } = swaggerConfiguration;
    expect(info.title).toEqual(api.titulo);
    expect(info.description).toEqual(api.descricao);
    expect(info.version).toEqual(api.versao);
  });
});
