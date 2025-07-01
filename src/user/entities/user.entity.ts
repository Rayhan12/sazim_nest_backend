import { Collection, Entity, OneToMany, PrimaryKey, Property, Unique } from "@mikro-orm/core";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class User {

    @PrimaryKey()
    id!: number;
    
    @Property()
    first_name!: string;

    @Property()
    last_name!: string;

    @Property()
    address!: string;

    @Property()
    password!: string;

    @Property()
    firebase_console_manager_token?: string = "DUMMY TOKEN";

    @Unique()
    @Property()
    email!: string;

    @Property()
    date_joined?: Date = new Date();

    @Property()
    created_at?: Date = new Date();

    @Property({onUpdate: () => new Date()})
    updated_at?: Date = new Date();

    @OneToMany(()=>Product, product => product.user)
    products = new Collection<Product>(this);

}
