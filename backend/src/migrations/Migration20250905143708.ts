import { Migration } from '@mikro-orm/migrations';

export class Migration20250905143708 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "admin" add column "password" varchar(255) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "admin" drop column "password";`);
  }
}
