import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { ArquivoConteudoEntity } from './src/arquivos/entities/arquivo-conteudo.entity';
import { ArquivoEntity } from './src/arquivos/entities/arquivo.entity';
import { SolicitacaoArquivoEntity } from './src/solicitacoes/entities/solicitacao-arquivo.entity';
import { SolicitacaoEntity } from './src/solicitacoes/entities/solicitacao.entity';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: configService.get<string>('POSTGRES_HOST'),
  port: parseInt(configService.get<string>('POSTGRES_PORT') as string, 5432),
  username: configService.get<string>('POSTGRES_USER'),
  password: configService.get<string>('POSTGRES_PASSWORD'),
  database: configService.get<string>('POSTGRES_DATABASE'),
  entities: [
    ArquivoEntity,
    ArquivoConteudoEntity,
    SolicitacaoEntity,
    SolicitacaoArquivoEntity,
  ],
  migrations: ['src/config/database/migrations/*.ts'],
  logging: true,
});

export default AppDataSource;
