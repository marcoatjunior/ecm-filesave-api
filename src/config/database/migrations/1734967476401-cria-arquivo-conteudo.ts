import { MigrationInterface, QueryRunner } from 'typeorm';

export class CriaArquivoConteudo1734967476401 implements MigrationInterface {
  name = 'CriaArquivoConteudo1734967476401';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "ARQUIVO_CONTEUDO" ("ID" uuid NOT NULL DEFAULT uuid_generate_v4(), "ID_ARQUIVO" uuid NOT NULL, "CONTEUDO" bytea NOT NULL, "ORGANIZACAO" character varying(100) NOT NULL, "SISTEMA" character varying(100) NOT NULL, "NOME" character varying(300) NOT NULL, "TIPO" character varying(50) NOT NULL, "EXTRAS" jsonb NOT NULL DEFAULT '[]', "USUARIO_CRIACAO" character varying(300) NOT NULL, "DATA_HORA_CRIACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "USUARIO_ATUALIZACAO" character varying(300) NOT NULL, "DATA_HORA_ATUALIZACAO" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_f226d20d74f9f82cc7ecb708377" PRIMARY KEY ("ID")); COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."ID" IS 'ID do conteúdo do arquivo (PK)'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."ID_ARQUIVO" IS 'ID do arquivo na tabela ARQUIVO'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."CONTEUDO" IS 'Conteúdo binário do arquivo'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."ORGANIZACAO" IS 'Nome da organização que o arquivo ficará vinculado'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."SISTEMA" IS 'Nome do sistema que enviou o arquivo'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."NOME" IS 'Nome do arquivo para o sistema cliente'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."TIPO" IS 'Tipo do arquivo para o sistema cliente'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."EXTRAS" IS 'Propriedades extras (JSON) do arquivo para o sistema cliente'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."USUARIO_CRIACAO" IS 'ID de autenticação do usuário de criação do registro'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."DATA_HORA_CRIACAO" IS 'Data e hora de criação do registro'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."USUARIO_ATUALIZACAO" IS 'ID de autenticação do usuário de atualização do registro'; COMMENT ON COLUMN "ARQUIVO_CONTEUDO"."DATA_HORA_ATUALIZACAO" IS 'Data e hora de atualização do registro'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ARQUIVO_CONTEUDO"`);
  }
}
