import {
  IsIn,
  IsOptional,
  IsString,
  MinLength,
  NotContains,
} from "class-validator";

export class PatchUserRequest {
  @IsOptional()
  @IsIn(["Regular", "Admin"])
  accessLevel: string = null;

  @IsOptional()
  @MinLength(8)
  password: string = null;
}

export class CreateUserRequest {
  @IsIn(["Regular", "Admin"])
  accessLevel: string;

  @MinLength(8)
  password: string;

  @MinLength(5)
  @NotContains(" ")
  username: string;
}

export class DeleteUserRequest {
  @MinLength(5)
  @NotContains(" ")
  username: string;
}

export class CreateTokenRequest {
  @MinLength(8)
  @NotContains(" ")
  password: string;

  @MinLength(5)
  @NotContains(" ")
  username: string;
}

export class CreateEquipmentRequest {
  @MinLength(1)
  @IsString()
  serialNumber: string;

  @IsOptional()
  checkedOutTo: string = null;

  @IsOptional()
  notes: string = null;

  @IsOptional()
  id: number = null;

  @IsOptional()
  model: string = null;

  @IsOptional()
  type: string = null;

  @IsOptional()
  status: string = null;

  @IsOptional()
  vendor: string = null;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  jobCode?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  resourceNumber?: string;
}

export class BatchCreateEquipmentRequest {
  @MinLength(1)
  @IsString()
  serialNumber: string;

  start: number;

  end: number;

  @IsOptional()
  checkedOutTo: string = null;

  @IsOptional()
  notes: string = null;

  @IsOptional()
  id: number = null;

  @IsOptional()
  model: string = null;

  @IsOptional()
  type: string = null;

  @IsOptional()
  status: string = null;

  @IsOptional()
  vendor: string = null;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  jobCode?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  resourceNumber?: string;
}

export class PatchEquipmentRequest {
  @MinLength(1)
  serialNumber: string;

  @IsOptional()
  checkedOutTo: string = null;

  @IsOptional()
  notes: string = null;

  @IsOptional()
  id: number = null;

  @IsOptional()
  model: string = null;

  @IsOptional()
  type: string = null;

  @IsOptional()
  status: string = null;

  @IsOptional()
  vendor: string = null;

  @IsOptional()
  phoneNumber?: string;

  @IsOptional()
  jobCode?: string;

  @IsOptional()
  location?: string;

  @IsOptional()
  resourceNumber?: string;
}

export class SetGuestRequest {
  @IsIn(["guest_login", "guest_access"])
  key: string;

  value: string = null;
}

export class GetGuestRequest {
  key: string;
}

export class AutoBackupRequest {
  path: string;
  interval: string;
}
