import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdatePropertyStatusDto {
  @IsEnum(['APPROVED', 'REJECTED'])
  status!: 'APPROVED' | 'REJECTED';

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  rejectionReason?: string;
}
