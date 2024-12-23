import { MigrationInterface, QueryRunner } from "typeorm";

export class AtualizaArquivoNumeroBytes1734981970492 implements MigrationInterface {
    name = 'AtualizaArquivoNumeroBytes1734981970492'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ARQUIVO" ALTER COLUMN "NUMERO_BYTES" TYPE numeric(20)`);
        await queryRunner.query(`ALTER TABLE "ARQUIVO" ALTER COLUMN "NUMERO_BYTES" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ARQUIVO" ALTER COLUMN "NUMERO_BYTES" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "ARQUIVO" ALTER COLUMN "NUMERO_BYTES" TYPE numeric(20,0)`);
    }

}
