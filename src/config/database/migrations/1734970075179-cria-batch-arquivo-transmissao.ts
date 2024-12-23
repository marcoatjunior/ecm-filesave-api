import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaBatchArquivoTransmissao1734970075179
  implements MigrationInterface
{
  name = 'CriaBatchArquivoTransmissao1734970075179';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."BATCH_ARQUIVO_TRANSMISSAO_situacao_enum" AS ENUM('S', 'E')`,
    );
    await queryRunner.query(
      `CREATE TABLE "BATCH_ARQUIVO_TRANSMISSAO" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "DATA_HORA_INICIO" TIMESTAMP WITH TIME ZONE NOT NULL, "DATA_HORA_FIM" TIMESTAMP WITH TIME ZONE, "SITUACAO" "public"."BATCH_ARQUIVO_TRANSMISSAO_situacao_enum", "LOG_EXECUCAO" jsonb NOT NULL DEFAULT '[]', "USUARIO_CRIACAO" character varying(300) NOT NULL, "DATA_HORA_CRIACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "USUARIO_ATUALIZACAO" character varying(300) NOT NULL, "DATA_HORA_ATUALIZACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_c7473348f86077af545804ae651" PRIMARY KEY ("ID")); COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."ID" IS 'ID da execução da rotina batch de transmissão de arquivos (PK)'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."DATA_HORA_INICIO" IS 'Data e hora de início da execução da rotina batch'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."DATA_HORA_FIM" IS 'Data e hora de fim da execução da rotina batch'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."SITUACAO" IS 'Situação de execução do rotina batch'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."LOG_EXECUCAO" IS 'Log de execução da rotina batch'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."USUARIO_CRIACAO" IS 'ID de autenticação do usuário de criação do registro'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."DATA_HORA_CRIACAO" IS 'Data e hora de criação do registro'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."USUARIO_ATUALIZACAO" IS 'ID de autenticação do usuário de atualização do registro'; COMMENT ON COLUMN "BATCH_ARQUIVO_TRANSMISSAO"."DATA_HORA_ATUALIZACAO" IS 'Data e hora de atualização do registro'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "BATCH_ARQUIVO_TRANSMISSAO"`);
    await queryRunner.query(
      `DROP TYPE "public"."BATCH_ARQUIVO_TRANSMISSAO_situacao_enum"`,
    );
  }
}
