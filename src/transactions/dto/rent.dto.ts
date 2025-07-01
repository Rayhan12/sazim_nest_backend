import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { RentOptions } from "src/product/dto/create-product.dto";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export class RentDto{
    
    @ApiProperty({
        description: 'ID of the product being rented',
        example: 1
    })
    @IsNotEmpty()
    @IsNumber()
    product_id !: number
    
    @ApiProperty({
        description: 'ID of the user renting the product',
        example: 2
    })
    @IsNotEmpty()
    @IsNumber()
    renter_id !: number

    @ApiProperty({
        description: 'Rent option (hourly or daily)',
        enum: RentOptions,
        example: RentOptions.PER_DAY
    })
    @IsNotEmpty()
    @IsEnum(RentOptions)
    rent_option !:RentOptions

    @ApiProperty({
        description: 'Total price for the rental period',
        example: 75.00
    })
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    @Type(() => Number)
    totalPrice!: number;

    @ApiProperty({
        description: 'Date when the rental was initiated',
        example: new Date()
    })
    @IsDate()
    @IsNotEmpty()
    rent_date!: Date

    @ApiProperty({
        description: 'Start date of the rental period',
        example: new Date('2024-01-15')
    })
    @IsDate()
    @IsNotEmpty()
    rent_period_start_date!: Date

    @ApiProperty({
        description: 'End date of the rental period',
        example: new Date('2024-01-18')
    })
    @IsDate()
    @IsNotEmpty()
    rent_period_end_date!: Date
}