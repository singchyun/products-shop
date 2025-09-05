create table "product" (
  "id" serial primary key,
  "name" varchar(255) not null,
  "description" varchar(1024) null,
  "price" numeric(10,2) not null,
  "stock_quantity" int not null
);

