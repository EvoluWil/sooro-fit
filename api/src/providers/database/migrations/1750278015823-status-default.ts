import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusDefault1750278015823 implements MigrationInterface {
    name = 'StatusDefault1750278015823'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "username" varchar(60) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(20) NOT NULL, "status" varchar(10) NOT NULL DEFAULT ('active'), "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "name", "username", "password", "role", "status", "created_at") SELECT "id", "name", "username", "password", "role", "status", "created_at" FROM "user"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "username" varchar(60) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(20) NOT NULL, "status" varchar(10) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"))`);
        await queryRunner.query(`INSERT INTO "user"("id", "name", "username", "password", "role", "status", "created_at") SELECT "id", "name", "username", "password", "role", "status", "created_at" FROM "temporary_user"`);
        await queryRunner.query(`DROP TABLE "temporary_user"`);
    }

}
