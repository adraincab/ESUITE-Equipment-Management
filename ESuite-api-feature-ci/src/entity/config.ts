import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Config extends BaseEntity {
  @PrimaryColumn({ name: "key", default: "guest" })
  key!: string;

  @Column({ name: "value", default: "false", nullable: true })
  value!: string;
}
