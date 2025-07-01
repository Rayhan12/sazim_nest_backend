import { Migration } from '@mikro-orm/migrations';

export class Migration20250630055127 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`user\` (\`id\` integer not null primary key autoincrement, \`first_name\` text not null, \`last_name\` text not null, \`address\` text not null, \`password\` text not null, \`firebase_console_manager_token\` text null default 'DUMMY TOKEN', \`email\` text not null, \`date_joined\` datetime null, \`created_at\` datetime null, \`updated_at\` datetime null);`);
    this.addSql(`create unique index \`user_email_unique\` on \`user\` (\`email\`);`);

    this.addSql(`create table \`post\` (\`id\` integer not null primary key autoincrement, \`title\` text not null, \`details\` text null, \`created_at\` datetime null, \`updated_at\` datetime null, \`user_id\` integer not null, constraint \`post_user_id_foreign\` foreign key(\`user_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`post_user_id_index\` on \`post\` (\`user_id\`);`);
  }

}
