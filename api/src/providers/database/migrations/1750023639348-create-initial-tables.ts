import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialTables1750023639348 implements MigrationInterface {
    name = 'CreateInitialTables1750023639348'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(5,2) NOT NULL, "bmi" decimal(5,2) NOT NULL, "assessment" varchar(30) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "student_id" varchar, "evaluator_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar(60) NOT NULL, "user" varchar(60) NOT NULL, "password" varchar(255) NOT NULL, "role" varchar(20) NOT NULL, "status" varchar(10) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "UQ_9ec886924bcd97ae6f14220017a" UNIQUE ("user"))`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expire_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(5,2) NOT NULL, "bmi" decimal(5,2) NOT NULL, "assessment" varchar(30) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "student_id" varchar, "evaluator_id" varchar, CONSTRAINT "FK_92cbbad1fe7842768c8410cbe31" FOREIGN KEY ("student_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE CASCADE, CONSTRAINT "FK_e9842be3759cb3dbd7f6919a4c2" FOREIGN KEY ("evaluator_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_bmi_assessment"("id", "height", "weight", "bmi", "assessment", "created_at", "student_id", "evaluator_id") SELECT "id", "height", "weight", "bmi", "assessment", "created_at", "student_id", "evaluator_id" FROM "bmi_assessment"`);
        await queryRunner.query(`DROP TABLE "bmi_assessment"`);
        await queryRunner.query(`ALTER TABLE "temporary_bmi_assessment" RENAME TO "bmi_assessment"`);
        await queryRunner.query(`CREATE TABLE "temporary_auth" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expire_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar, CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE CASCADE)`);
        await queryRunner.query(`INSERT INTO "temporary_auth"("id", "refresh_token", "expire_at", "created_at", "user_id") SELECT "id", "refresh_token", "expire_at", "created_at", "user_id" FROM "auth"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`ALTER TABLE "temporary_auth" RENAME TO "auth"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" RENAME TO "temporary_auth"`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" varchar PRIMARY KEY NOT NULL, "refresh_token" varchar(255) NOT NULL, "expire_at" datetime NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "user_id" varchar)`);
        await queryRunner.query(`INSERT INTO "auth"("id", "refresh_token", "expire_at", "created_at", "user_id") SELECT "id", "refresh_token", "expire_at", "created_at", "user_id" FROM "temporary_auth"`);
        await queryRunner.query(`DROP TABLE "temporary_auth"`);
        await queryRunner.query(`ALTER TABLE "bmi_assessment" RENAME TO "temporary_bmi_assessment"`);
        await queryRunner.query(`CREATE TABLE "bmi_assessment" ("id" varchar PRIMARY KEY NOT NULL, "height" decimal(5,2) NOT NULL, "weight" decimal(5,2) NOT NULL, "bmi" decimal(5,2) NOT NULL, "assessment" varchar(30) NOT NULL, "created_at" datetime NOT NULL DEFAULT (datetime('now')), "student_id" varchar, "evaluator_id" varchar)`);
        await queryRunner.query(`INSERT INTO "bmi_assessment"("id", "height", "weight", "bmi", "assessment", "created_at", "student_id", "evaluator_id") SELECT "id", "height", "weight", "bmi", "assessment", "created_at", "student_id", "evaluator_id" FROM "temporary_bmi_assessment"`);
        await queryRunner.query(`DROP TABLE "temporary_bmi_assessment"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "bmi_assessment"`);
    }

}
