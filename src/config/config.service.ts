import { InternalServerErrorException } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ArquivoConteudoEntity, ArquivoEntity } from 'src/arquivos/entities';
import { excecoes } from 'src/common/resources';
import {
  SolicitacaoArquivoEntity,
  SolicitacaoEntity,
} from 'src/solicitacoes/entities';

dotenv.config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new InternalServerErrorException(excecoes.erroInterno);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach((k) => this.getValue(k, true));
    return this;
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public isProduction() {
    return this.getValue('AMBIENTE', false) === 'production';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [
        ArquivoEntity,
        ArquivoConteudoEntity,
        SolicitacaoEntity,
        SolicitacaoArquivoEntity,
      ],
      migrationsTableName: 'MIGRATIONS',
      migrations: ['src/database/migrations/*.ts'],
      synchronize: false,
      ssl: this.isProduction(),
    };
  }
}

const configService = new ConfigService(process.env).ensureValues([
  'POSTGRES_HOST',
  'POSTGRES_PORT',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DATABASE',
]);

export { configService };

