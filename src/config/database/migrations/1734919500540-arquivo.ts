import { MigrationInterface, QueryRunner } from 'typeorm';

export class Arquivo1734919500540 implements MigrationInterface {
  name = 'Arquivo1734919500540';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "arquivo" ("usuarioCriacao" character varying(300) NOT NULL, "dataHoraCriacao" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "usuarioAtualizacao" character varying(300) NOT NULL, "dataHoraAtualizacao" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "idEcm" character varying(80) NOT NULL, "nome" character varying(300) NOT NULL, CONSTRAINT "PK_956a4593ecc7963784e642c1b10" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "arquivo"`);
  }
}
