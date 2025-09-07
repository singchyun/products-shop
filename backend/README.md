# Step 1 of 3: Backend

Welcome to the Backend code repository.

## Description

<p>
<img src="https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/archi-backend.png" />
</p>

This backend is built on NestJS with MikroORM integration to PostgreSQL database. 

## Prerequisites

You should already have an instance of PostgreSQL running.

## Installation

1. Clone this Github repo locally.
2. Rename the file [./.env.sample](./.env.sample) to **.env**, and edit the database credentials in it accordingly.
3. Login to your PostgreSQL database and run the DDL file [./database-schema.sql](./database-schema.sql).
4. Run `npm install`
5. Run `npm run start:dev`
6. Run `curl http://localhost:3000/public/products`
   - You should be able to see a list of products returned. 

## Next Steps

Congratulations on setting up the backend successfully! 

You may proceed to [Step 2: Admin Frontend](../frontend/)