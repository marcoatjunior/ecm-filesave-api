import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropColunaExtras1735307976730 implements MigrationInterface {
  name = 'DropColunaExtras1735307976730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO_CONTEUDO" DROP COLUMN "EXTRAS"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" DROP COLUMN "EXTRAS"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" ADD "EXTRAS" jsonb NOT NULL DEFAULT '[]'`,
    );
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO_CONTEUDO" ADD "EXTRAS" jsonb NOT NULL DEFAULT '[]'`,
    );
  }
}
