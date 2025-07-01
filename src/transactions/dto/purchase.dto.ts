import { IsDate, IsNotEmpty, isNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class PurchaseDto{

    @ApiProperty({
        description: 'ID of the buyer/user making the purchase',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    buyer !: number;
    
    @ApiProperty({
        description: 'ID of the product being purchased',
        example: 1
    })
    @IsNumber()
    @IsNotEmpty()
    product!: number;
    
    @ApiProperty({
        description: 'Date of purchase',
        example: new Date(),
        required: false
    })
    @IsDate()
    purchase_date ?:Date = new Date; 
}