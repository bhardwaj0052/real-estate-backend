import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePropertyDto {
  @ApiProperty({ example: 'Modern apartment' })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ example: 'Two-bedroom apartment near downtown.' })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ example: 'Delhi' })
  @IsString()
  @IsNotEmpty()
  city!: string;

  @ApiProperty({ example: 'Sector 15' })
  @IsString()
  @IsNotEmpty()
  area!: string;

  @ApiProperty({ example: '123 Green Avenue, Delhi' })
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ example: 28.6139 })
  @Type(() => Number)
  @IsNumber()
  lat!: number;

  @ApiProperty({ example: 77.209 })
  @Type(() => Number)
  @IsNumber()
  lng!: number;

  @ApiProperty({ example: 'APARTMENT' })
  @IsString()
  @IsNotEmpty()
  propertyType!: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  bhk?: number;

  @ApiProperty({ example: 1200 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sqft!: number;

  @ApiProperty({ example: 250000, minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({
    type: [String],
    example: ['Parking', 'Garden', 'Security'],
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities?: string[];

  @ApiProperty({
    type: [String],
    example: ['https://example.com/property.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  images!: string[];

  @ApiPropertyOptional({
    enum: ['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'],
    default: 'PENDING',
  })
  @IsOptional()
  @IsEnum(['DRAFT', 'PENDING', 'APPROVED', 'REJECTED'])
  status?: string;
}
