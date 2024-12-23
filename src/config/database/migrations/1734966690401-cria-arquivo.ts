import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaArquivo1734966690401 implements MigrationInterface {
  name = 'CriaArquivo1734966690401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ARQUIVO" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "ID_ECM" character varying(80), "SITUACAO" "public"."ARQUIVO_situacao_enum" NOT NULL DEFAULT 'P', "NOME" character varying(300) NOT NULL, "NUMERO_BYTES" numeric(20) NOT NULL, "DATA_HORA_TRANSMISSAO" TIMESTAMP WITH TIME ZONE, "USUARIO_CRIACAO" character varying(300) NOT NULL, "DATA_HORA_CRIACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "USUARIO_ATUALIZACAO" character varying(300) NOT NULL, "DATA_HORA_ATUALIZACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f172e98e7c6d049111c5997a16b" PRIMARY KEY ("ID")); COMMENT ON COLUMN "ARQUIVO"."ID" IS 'ID do arquivo (PK)'; COMMENT ON COLUMN "ARQUIVO"."ID_ECM" IS 'Identificador do arquivo no ECM'; COMMENT ON COLUMN "ARQUIVO"."SITUACAO" IS 'Situação de envio do arquivo no ECM'; COMMENT ON COLUMN "ARQUIVO"."NOME" IS 'Nome do arquivo'; COMMENT ON COLUMN "ARQUIVO"."NUMERO_BYTES" IS 'Tamanho do arquivo em bytes'; COMMENT ON COLUMN "ARQUIVO"."DATA_HORA_TRANSMISSAO" IS 'Data e hora da transmissão do arquivo ao ECM'; COMMENT ON COLUMN "ARQUIVO"."USUARIO_CRIACAO" IS 'ID de autenticação do usuário de criação do registro'; COMMENT ON COLUMN "ARQUIVO"."DATA_HORA_CRIACAO" IS 'Data e hora de criação do registro'; COMMENT ON COLUMN "ARQUIVO"."USUARIO_ATUALIZACAO" IS 'ID de autenticação do usuário de atualização do registro'; COMMENT ON COLUMN "ARQUIVO"."DATA_HORA_ATUALIZACAO" IS 'Data e hora de atualização do registro'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ARQUIVO"`);
  }
}
