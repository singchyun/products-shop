import { Migration } from '@mikro-orm/migrations';

export class Migration20250907010430 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "product" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));`);
    this.addSql(`alter table "product" alter column "image_url" set default 'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/image-not-found.webp';`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "product" alter column "image_url" type varchar(255) using ("image_url"::varchar(255));`);
    this.addSql(`alter table "product" alter column "image_url" set default 'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/Image-not-found.png';`);
  }

}
