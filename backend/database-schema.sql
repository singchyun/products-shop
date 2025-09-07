create table "admin" (
  "id" serial primary key,
  "name" varchar(255) not null,
  "email" varchar(255) null,
  "enabled" boolean not null default true,
  "last_login" date,
  "password" varchar(255) not null,
  "roles" text[] not null default '{}'::text[]
);

INSERT INTO admin (name, email, enabled, password, roles) VALUES ('Admin User', 'someone@acme.com', true, '$2b$05$ezk3wclE5SiyhR.i5eSkCOfv7n7br/6PV.3sZwifn.ujwElV4tPbq', '{"admin"}'); 

create table "product" (
  "id" serial primary key,
  "name" varchar(255) not null,
  "description" varchar(1024) null,
  "price" numeric(10,2) not null,
  "stock_quantity" int not null,
  "enabled" boolean not null default true,
  "image_url" varchar(1024) not null default 'https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/image-not-found.webp'
);

INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Teddy Bear', 'A soft and cuddly teddy bear.', 19.99, 50, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/2023_Pluszowy_mi%C5%9B.jpg/500px-2023_Pluszowy_mi%C5%9B.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Jigsaw Puzzle', 'A fun 1000-piece puzzle.', 14.99, 30, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Jigsaw_Puzzle_Accessory_Jigsafe.jpg/960px-Jigsaw_Puzzle_Accessory_Jigsafe.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Building Blocks', 'Colorful building blocks for kids.', 24.99, 40, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/JJ%27s_Building_Blocks_free_creative_commons_%284269399012%29.jpg/330px-JJ%27s_Building_Blocks_free_creative_commons_%284269399012%29.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Remote Car', 'A fast remote-controlled car.', 39.99, 20, true);
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Doll House', 'A beautiful doll house.', 59.99, 10, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Dollhouse%2C_local_museum_Dossenheim_01.jpg/960px-Dollhouse%2C_local_museum_Dossenheim_01.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Action Figure', 'Superhero action figure.', 12.99, 60, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Dragon_Ball_action_toy_in_india.jpg/500px-Dragon_Ball_action_toy_in_india.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Board Game', 'A classic family board game.', 29.99, 25, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Imaginiff_board_game_and_pieces_01.jpg/500px-Imaginiff_board_game_and_pieces_01.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Rubik''s Cube', 'A 3x3 Rubik''s Cube.', 9.99, 100, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Rubik%27s_cube%2C_CN_II.jpg/960px-Rubik%27s_cube%2C_CN_II.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Toy Train', 'Electric toy train set.', 49.99, 15, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Made_in_Germany_Tin_clockwork_toy_train_from_around_1900_pic-016.JPG/960px-Made_in_Germany_Tin_clockwork_toy_train_from_around_1900_pic-016.JPG');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Plush Rabbit', 'A cute plush rabbit.', 17.99, 35, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Happy_National_Teddybear_Day%21_%29_%2821278464375%29.jpg/500px-Happy_National_Teddybear_Day%21_%29_%2821278464375%29.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Water Gun', 'Summer water gun toy.', 7.99, 80, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/CreativeTools.se_-_PackshotCreator_-_Toy_water_pistol_%284340304099%29.jpg/960px-CreativeTools.se_-_PackshotCreator_-_Toy_water_pistol_%284340304099%29.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Yo-Yo', 'Classic wooden yo-yo.', 4.99, 120, true, 'https://upload.wikimedia.org/wikipedia/commons/9/92/Wooden_yo-yo.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Kite', 'Colorful outdoor kite.', 11.99, 50, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Go_fly_a_kite_%287511318416%29.jpg/500px-Go_fly_a_kite_%287511318416%29.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Puzzle Ball', '3D puzzle ball for kids.', 8.99, 45, true);
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Toy Drum', 'Mini drum set for children.', 22.99, 18, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Kids_Drum_28122011.jpg/960px-Kids_Drum_28122011.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Magic Kit', 'Beginner magic trick kit.', 27.99, 22, true);
INSERT INTO product (name, description, price, stock_quantity, enabled) VALUES ('Slime Pack', 'Colorful slime pack.', 6.99, 70, true);
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('RC Helicopter', 'Remote control helicopter.', 44.99, 12, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/S.E.5a_model_aircraft_from_E-flite_ARF_kit.JPG/960px-S.E.5a_model_aircraft_from_E-flite_ARF_kit.JPG');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Marble Set', 'Classic glass marble set. Temporarily taken off shelf due to safety concern.', 5.99, 90, false, 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Box_with_Marbles.jpg/500px-Box_with_Marbles.jpg');
INSERT INTO product (name, description, price, stock_quantity, enabled, image_url) VALUES ('Finger Skateboard', 'Mini finger skateboard toy.', 3.99, 110, true, 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fingerboard.jpg/960px-Fingerboard.jpg');

