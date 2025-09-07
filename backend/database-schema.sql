create table "product" (
  "id" serial primary key,
  "name" varchar(255) not null,
  "description" varchar(1024) null,
  "price" numeric(10,2) not null,
  "stock_quantity" int not null,
  "enabled" boolean not null default true,
  "image_url" varchar(1024) not null default 'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/image-not-found.webp'
);

INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Teddy Bear', 'A soft and cuddly teddy bear.', 19.99, 50, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Jigsaw Puzzle', 'A fun 1000-piece puzzle.', 14.99, 30, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Building Blocks', 'Colorful building blocks for kids.', 24.99, 40, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Remote Car', 'A fast remote-controlled car.', 39.99, 20, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Doll House', 'A beautiful doll house.', 59.99, 10, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Action Figure', 'Superhero action figure.', 12.99, 60, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Board Game', 'A classic family board game.', 29.99, 25, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Rubik''s Cube', 'A 3x3 Rubik''s Cube.', 9.99, 100, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Toy Train', 'Electric toy train set.', 49.99, 15, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Plush Rabbit', 'A cute plush rabbit.', 17.99, 35, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Water Gun', 'Summer water gun toy.', 7.99, 80, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Yo-Yo', 'Classic wooden yo-yo.', 4.99, 120, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Kite', 'Colorful outdoor kite.', 11.99, 50, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Puzzle Ball', '3D puzzle ball for kids.', 8.99, 45, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Toy Drum', 'Mini drum set for children.', 22.99, 18, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Magic Kit', 'Beginner magic trick kit.', 27.99, 22, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Slime Pack', 'Colorful slime pack.', 6.99, 70, false);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('RC Helicopter', 'Remote control helicopter.', 44.99, 12, false);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Marble Set', 'Classic glass marble set.', 5.99, 90, false);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Finger Skateboard', 'Mini finger skateboard toy.', 3.99, 110, false);

