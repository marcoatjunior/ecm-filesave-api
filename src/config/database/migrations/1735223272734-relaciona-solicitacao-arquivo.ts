import { MigrationInterface, QueryRunner } from 'typeorm';

export class RelacionaSolicitacaoArquivo1735223272734
  implements MigrationInterface
{
  name = 'RelacionaSolicitacaoArquivo1735223272734';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" DROP COLUMN "ID_SOLICITACAO"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO" ADD CONSTRAINT "FK_f172e98e7c6d049111c5997a16b" FOREIGN KEY ("ID") REFERENCES "ARQUIVO_CONTEUDO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" ADD CONSTRAINT "FK_48e49928ff43fdec699df67ebb1" FOREIGN KEY ("ID") REFERENCES "SOLICITACAO_ARQUIVO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO" DROP CONSTRAINT "FK_48e49928ff43fdec699df67ebb1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO" DROP CONSTRAINT "FK_f172e98e7c6d049111c5997a16b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "SOLICITACAO_ARQUIVO" ADD "ID_SOLICITACAO" uuid NOT NULL`,
    );
  }
}
