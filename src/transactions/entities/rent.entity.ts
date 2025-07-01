import { Entity, Enum, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { IsEnum } from 'class-validator';
import { RentOptions } from '../../product/dto/create-product.dto';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Rent {
  
    @PrimaryKey()
    id!: number;


    @ManyToOne(()=> Product)
    product: Product

    @ManyToOne(()=> User)
    renter : User

    @IsEnum(RentOptions)
    @Property({type:'string'})
    rent_option :RentOptions

    @Property({ type: 'float', columnType: 'decimal(10,2)' })
    totalPrice!: number;

    @Property()
    rent_date!: Date

    @Property()
    rent_period_start_date!: Date

    @Property()
    rent_period_end_date!: Date


}
