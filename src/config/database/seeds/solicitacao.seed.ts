import { SolicitacaoEntity } from 'src/solicitacoes/entities';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class SolicitacaoSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const factory = factoryManager.get(SolicitacaoEntity);
    await(factory.saveMany(10));
  }
}
