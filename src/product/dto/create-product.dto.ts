import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum CategoryEnum {
  ELECTRONICS = 'electronics',
  FURNITURE = 'furniture',
  HOME_APPLIANCES = 'home_appliances',
  SPORTING_GOODS = 'sporting_goods',
  OUTDOOR = 'outdoor',
  TOYS = 'toys',
}

export enum RentOptions {
  PER_HOUR = 'hour',
  PER_DAY = 'day',
}

export class CreateProductDto {

  @ApiProperty({
    description: 'ID of the user creating the product',
    example: 1
  })
  @IsNotEmpty()
  user_id!: number;

  @ApiProperty({
    description: 'Product title',
    example: 'iPhone 13 Pro'
  })
  @IsNotEmpty()
  @IsString()
  title!: string;

  @ApiProperty({
    description: 'Product description',
    example: 'Latest iPhone model with advanced camera features and A15 Bionic chip'
  })
  @IsNotEmpty()
  @IsString()
  description!: string;

  @ApiProperty({
    description: 'Product category',
    enum: CategoryEnum,
    example: CategoryEnum.ELECTRONICS
  })
  @IsEnum(CategoryEnum)
  categories!: CategoryEnum;

  @ApiProperty({
    description: 'Rent option (hourly or daily)',
    enum: RentOptions,
    example: RentOptions.PER_DAY
  })
  @IsEnum(RentOptions)
  rent_option!: RentOptions;

  @ApiProperty({
    description: 'Rent price per unit (hour/day)',
    example: 25.50
  })
  @IsNotEmpty()
  rent_price!: number;

  @ApiProperty({
    description: 'Purchase price of the product',
    example: 999.99
  })
  @IsNotEmpty()
  purchase_price!: number;

  @ApiProperty({
    description: 'Date when the product was posted',
    example: new Date(),
    required: false
  })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date_posted?: Date = new Date();

  @ApiProperty({
    description: 'URL or path to product image',
    example: 'https://example.com/images/iphone13.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  product_image?: string; 
}
