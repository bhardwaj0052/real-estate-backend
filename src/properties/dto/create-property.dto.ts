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

  @ApiProperty({ example: 250000, minimum: 0 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price!: number;

  @ApiProperty({ example: 'New York' })
  @IsString()
  @IsNotEmpty()
  location!: string;

  @ApiPropertyOptional({ enum: ['DRAFT', 'PENDING'], default: 'PENDING' })
  @IsOptional()
  @IsEnum(['DRAFT', 'PENDING'])
  status!: string;

  @ApiProperty({
    type: [String],
    example: ['https://example.com/property.jpg'],
  })
  @IsArray()
  @IsString({ each: true })
  images!: string[];
}
