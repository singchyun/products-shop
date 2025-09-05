import { Migration } from '@mikro-orm/migrations';

export class Migration20250905144714 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "admin" add column "roles" text[] not null default '{}';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin" drop column "roles";`);
  }

}
