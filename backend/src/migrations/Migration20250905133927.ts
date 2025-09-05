import { Migration } from '@mikro-orm/migrations';

export class Migration20250905133927 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "product" alter column "description" type varchar(1024) using ("description"::varchar(1024));`,
    );
    this.addSql(
      `alter table "product" alter column "price" type numeric(10,2) using ("price"::numeric(10,2));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "product" alter column "description" type varchar(255) using ("description"::varchar(255));`,
    );
    this.addSql(
      `alter table "product" alter column "price" type int using ("price"::int);`,
    );
  }
}
