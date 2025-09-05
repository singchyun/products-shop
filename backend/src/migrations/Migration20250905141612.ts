import { Migration } from '@mikro-orm/migrations';

export class Migration20250905141612 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "admin" ("id" serial primary key, "name" varchar(255) not null, "email" varchar(255) not null, "enabled" boolean not null default true, "last_login" date null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "admin" cascade;`);
  }
}
