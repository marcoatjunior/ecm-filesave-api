import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaSolicitacao1734968540788 implements MigrationInterface {
  name = 'CriaSolicitacao1734968540788';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "SOLICITACAO" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "ORGANIZACAO" character varying(100) NOT NULL, "SISTEMA" character varying(100) NOT NULL, "DATA_HORA_EXPIRACAO" TIMESTAMP WITH TIME ZONE, "USUARIO_CRIACAO" character varying(300) NOT NULL, "DATA_HORA_CRIACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "USUARIO_ATUALIZACAO" character varying(300) NOT NULL, "DATA_HORA_ATUALIZACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_48e49928ff43fdec699df67ebb1" PRIMARY KEY ("ID")); COMMENT ON COLUMN "SOLICITACAO"."ID" IS 'ID da solicitação (PK)'; COMMENT ON COLUMN "SOLICITACAO"."ORGANIZACAO" IS 'Nome da organização que a solicitação ficará vinculada'; COMMENT ON COLUMN "SOLICITACAO"."SISTEMA" IS 'Nome do sistema que solicitou o envio de arquivos'; COMMENT ON COLUMN "SOLICITACAO"."DATA_HORA_EXPIRACAO" IS 'Data e hora de expiração da solicitação'; COMMENT ON COLUMN "SOLICITACAO"."USUARIO_CRIACAO" IS 'ID de autenticação do usuário de criação do registro'; COMMENT ON COLUMN "SOLICITACAO"."DATA_HORA_CRIACAO" IS 'Data e hora de criação do registro'; COMMENT ON COLUMN "SOLICITACAO"."USUARIO_ATUALIZACAO" IS 'ID de autenticação do usuário de atualização do registro'; COMMENT ON COLUMN "SOLICITACAO"."DATA_HORA_ATUALIZACAO" IS 'Data e hora de atualização do registro'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "SOLICITACAO"`);
  }
}
