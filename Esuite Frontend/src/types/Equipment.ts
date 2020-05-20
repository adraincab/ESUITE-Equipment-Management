import { EquipmentType } from "@/types/EquipmentType.ts";
import { EquipmentStatus } from "@/types/EquipmentStatus.ts";

export class Equipment extends Object {
  serialNumber!: string;
  location?: string;
  notes?: string;
  model?: string;
  type?: EquipmentType;
  status?: EquipmentStatus;
  vendor?: string;

  checkedOutTo?: string;
  jobCode?: string;
  phoneNumber?: string;
  resourceNumber?: string;
}

export class CreateEquipmentRequest extends Object {
  serialNumber!: string;
  location?: string;
  notes?: string;
  model?: string;
  type?: EquipmentType;
  status?: EquipmentStatus;
  vendor?: string;

  checkedOutTo?: string;
  jobCode?: string;
  phoneNumber?: string;
  resourceNumber?: string;
}

export class BatchCreateEquipmentRequest extends Object {
  serialNumber!: string;
  start!: number;
  end!: number;
  location?: string;
  notes?: string;
  model?: string;
  type?: EquipmentType;
  status?: EquipmentStatus;
  vendor?: string;

  checkedOutTo?: string;
  jobCode?: string;
  phoneNumber?: string;
  resourceNumber?: string;
}
