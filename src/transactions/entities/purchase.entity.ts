
import { Entity, ManyToOne, PrimaryKey } from '@mikro-orm/core';
import { Product } from '../../product/entities/product.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Purchase {
  @PrimaryKey()
  id!: number;

  @ManyToOne(()=> Product)
  product: Product

  @ManyToOne(()=> User)
  buyer: User


}
