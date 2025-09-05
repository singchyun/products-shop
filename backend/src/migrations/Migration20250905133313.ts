import { Migration } from '@mikro-orm/migrations';

export class Migration20250905133313 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "product" ("id" serial primary key, "name" varchar(255) not null, "description" varchar(255) null, "price" int not null, "stock_quantity" int not null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "product" cascade;`);
  }
}
