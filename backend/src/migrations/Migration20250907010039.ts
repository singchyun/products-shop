import { Migration } from '@mikro-orm/migrations';

export class Migration20250907010039 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" add column "image_url" varchar(255) not null default 'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/Image-not-found.png';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" drop column "image_url";`);
  }

}
