import { Migration } from '@mikro-orm/migrations';

export class Migration20250630235920_product_added extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`product\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`description\` text not null, \`categories\` text not null, \`rent_option\` text not null, \`rent_price\` decimal(10,2) not null, \`purchase_price\` decimal(10,2) not null, \`product_image\` text null, \`date_posted\` date not null default CURRENT_TIMESTAMP, \`user_id\` integer not null, constraint \`product_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`product_user_id_index\` on \`product\` (\`user_id\`);`);

    this.addSql(`create table \`rent\` (\`id\` integer not null primary key autoincrement, \`product_id\` integer not null, \`renter_id\` integer not null, \`rent_option\` text not null, \`total_price\` decimal(10,2) not null, \`rent_date\` datetime not null, \`rent_period_start_date\` datetime not null, \`rent_period_end_date\` datetime not null, constraint \`rent_product_id_foreign\` foreign key(\`product_id\`) references \`product\`(\`id\`) on update cascade, constraint \`rent_renter_id_foreign\` foreign key(\`renter_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`rent_product_id_index\` on \`rent\` (\`product_id\`);`);
    this.addSql(`create index \`rent_renter_id_index\` on \`rent\` (\`renter_id\`);`);

    this.addSql(`create table \`purchase\` (\`id\` integer not null primary key autoincrement, \`product_id\` integer not null, \`buyer_id\` integer not null, constraint \`purchase_product_id_foreign\` foreign key(\`product_id\`) references \`product\`(\`id\`) on update cascade, constraint \`purchase_buyer_id_foreign\` foreign key(\`buyer_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`purchase_product_id_index\` on \`purchase\` (\`product_id\`);`);
    this.addSql(`create index \`purchase_buyer_id_index\` on \`purchase\` (\`buyer_id\`);`);
  }

}
