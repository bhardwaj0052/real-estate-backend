import { IsEnum, IsOptional, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePropertyStatusDto {
  @ApiProperty({ enum: ['APPROVED', 'REJECTED'], example: 'APPROVED' })
  @IsEnum(['APPROVED', 'REJECTED'])
  status!: 'APPROVED' | 'REJECTED';

  @ApiPropertyOptional({
    example: 'Missing ownership documents',
    description: 'Required by business rules when status is REJECTED.',
  })
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  rejectionReason?: string;
}
