import {
    Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CategoryEnum, RentOptions } from '../dto/create-product.dto';
import { Rent } from '../../transactions/entities/rent.entity';
import { User } from '../../user/entities/user.entity';


@Entity()
export class Product {
  @PrimaryKey()
  id!: number;

  @Property()
  title!: string;

  @Property()
  description!: string;

  @Property({ type: 'string' })
  categories!: CategoryEnum;

  @Property({ type: 'string' })
  rent_option!: RentOptions;

  @Property({ type: 'float', columnType: 'decimal(10,2)' })
  rent_price!: number;

  @Property({ type: 'float', columnType: 'decimal(10,2)' })
  purchase_price!: number;

  @Property({ nullable: true })
  product_image?: string;

  @Property({ type: 'date', defaultRaw: 'CURRENT_TIMESTAMP' })
  date_posted: Date = new Date();

  @ManyToOne(()=> User)
  user!: User;

  @OneToMany(() => Rent, rent => rent.product)
  rents = new Collection<Rent>(this);

}
