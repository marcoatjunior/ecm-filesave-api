import { MigrationInterface, QueryRunner } from 'typeorm';

export class DropRelacaoConteudo1735315003489 implements MigrationInterface {
  name = 'DropRelacaoConteudo1735315003489';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO" DROP CONSTRAINT "FK_f172e98e7c6d049111c5997a16b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO_CONTEUDO" ADD CONSTRAINT "FK_f226d20d74f9f82cc7ecb708377" FOREIGN KEY ("ID") REFERENCES "ARQUIVO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO_CONTEUDO" DROP CONSTRAINT "FK_f226d20d74f9f82cc7ecb708377"`,
    );
    await queryRunner.query(
      `ALTER TABLE "ARQUIVO" ADD CONSTRAINT "FK_f172e98e7c6d049111c5997a16b" FOREIGN KEY ("ID") REFERENCES "ARQUIVO_CONTEUDO"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
