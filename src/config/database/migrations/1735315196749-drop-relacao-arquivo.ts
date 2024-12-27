import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropRelacaoArquivo1735315196749 implements MigrationInterface {
  name = 'DropRelacaoArquivo1735315196749';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" DROP CONSTRAINT "FK_48e49928ff43fdec699df67ebb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" ADD CONSTRAINT "FK_95d3ca3531a4b3ab9a28334fe48" FOREIGN KEY ("ID") REFERENCES "SOLICITACAO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" DROP CONSTRAINT "FK_95d3ca3531a4b3ab9a28334fe48"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" ADD CONSTRAINT "FK_48e49928ff43fdec699df67ebb1" FOREIGN KEY ("ID") REFERENCES "SOLICITACAO_ARQUIVO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
