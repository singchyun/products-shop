import { Migration } from '@mikro-orm/migrations';

export class Migration20250905134449 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" add column "enabled" boolean not null default true;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" drop column "enabled";`);
  }

}
