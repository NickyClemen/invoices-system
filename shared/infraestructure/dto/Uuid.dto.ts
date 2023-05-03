import { IsString } from 'class-validator';

export class UuidDTO {
  @IsString()
  readonly company_uuid: string;
}
