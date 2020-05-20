import { MigrationInterface, QueryRunner } from "typeorm";

export class Seed1553360039675 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("config")
      .values([
        { key: "guest_login", value: "Disabled" },
        { key: "guest_access", value: "Regular" },
        { key: "equip_verified", value: "Never" },
        { key: "auto_backup", value: "Never" },
        { key: "auto_backup_path", value: "None" },
      ])
      .execute();

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into("user")
      .values({
        username: "admin",
        password:
          "$2a$10$W65fzzZJP2yovobmA/ew0OQInNIrISRtl9VB/MWOCh0dX44ZXnwEe",
        accessLevel: "Admin",
      })
      .execute();

    if (process.env.NODE_ENV === "test") {
      await queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into("user")
        .values({
          username: "reguser",
          password:
            "$2a$10$W65fzzZJP2yovobmA/ew0OQInNIrISRtl9VB/MWOCh0dX44ZXnwEe",
          accessLevel: "Regular",
        })
        .execute();
    }
  }

  public async down(_: QueryRunner): Promise<any> {
    return;
  }
}
