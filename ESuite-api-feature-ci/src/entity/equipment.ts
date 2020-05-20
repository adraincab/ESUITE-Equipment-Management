import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Equipment extends BaseEntity {
  @PrimaryColumn()
  serialNumber!: string;

  @Column({ nullable: true })
  checkedOutTo?: string;

  @Column({ nullable: true })
  notes?: string;

  @Column({ nullable: true })
  model?: string;

  @Column({ nullable: true })
  type?: string;

  @Column({ nullable: true })
  status?: string;

  @Column({ nullable: true })
  vendor?: string;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  jobCode?: string;

  @Column({ nullable: true })
  location?: string;

  @Column({ nullable: true })
  resourceNumber?: string;
}
