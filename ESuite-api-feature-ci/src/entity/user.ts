import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryColumn()
  username!: string;

  @Column({ select: false, nullable: false })
  password!: string;

  @Column({ name: "access_level", nullable: false, default: "Regular" })
  accessLevel!: string;
}
