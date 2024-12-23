import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaSolicitacaoArquivo1734969346558 implements MigrationInterface {
  name = 'CriaSolicitacaoArquivo1734969346558';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "SOLICITACAO_ARQUIVO" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "ID_SOLICITACAO" uuid NOT NULL, "NOME" character varying(300) NOT NULL, "TIPO" character varying(50) NOT NULL, "EXTRAS" jsonb NOT NULL DEFAULT '[]', "USUARIO_CRIACAO" character varying(300) NOT NULL, "DATA_HORA_CRIACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "USUARIO_ATUALIZACAO" character varying(300) NOT NULL, "DATA_HORA_ATUALIZACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_95d3ca3531a4b3ab9a28334fe48" PRIMARY KEY ("ID")); COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."ID" IS 'ID da solicitação de arquivo (PK)'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."ID_SOLICITACAO" IS 'ID da solicitação na tabela SOLICITACAO'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."NOME" IS 'Nome do arquivo para o sistema cliente'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."TIPO" IS 'Tipo do arquivo para o sistema cliente'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."EXTRAS" IS 'Propriedades extras (JSON) do arquivo para o sistema cliente'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."USUARIO_CRIACAO" IS 'ID de autenticação do usuário de criação do registro'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."DATA_HORA_CRIACAO" IS 'Data e hora de criação do registro'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."USUARIO_ATUALIZACAO" IS 'ID de autenticação do usuário de atualização do registro'; COMMENT ON COLUMN "SOLICITACAO_ARQUIVO"."DATA_HORA_ATUALIZACAO" IS 'Data e hora de atualização do registro'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SOLICITACAO_ARQUIVO"`);
  }
}
