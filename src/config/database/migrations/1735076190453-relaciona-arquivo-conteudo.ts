import { MigrationInterface, QueryRunner } from "typeorm";

export class RelacionaArquivoConteudo1735076190453 implements MigrationInterface {
    name = 'RelacionaArquivoConteudo1735076190453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ARQUIVO_CONTEUDO" DROP COLUMN "ID_ARQUIVO"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ARQUIVO_CONTEUDO" ADD "ID_ARQUIVO" uuid NOT NULL`);
    }

}
