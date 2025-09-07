# Step 2 of 3: *Admin* Frontend

Welcome to the *Admin* Frontend code repository.

## Description

<p>
<img src="https://myshopproductsimages.s3.ap-southeast-1.amazonaws.com/archi-frontend-admin.png" />
</p>

This admin frontend is built on React with Bootstrap. 

## Prerequisites

You should already have the backend up and running. If not, please go back to [Step 1: Backend](../backend/).

## Installation

1. Clone this Github repo locally (which should have been done when installing the backend).
2. `cd frontend`
3. Edit [./.env.development](./.env.development) to verify the backend base URL is correct (usally `http://localhost:3000`).
4. Run `npm install`
5. (optional) Edit [./package.json](./package.json) to change the default running port `4168`.
6. Run `npm run start`
7. In your browser, browse to [http://localhost:4168](http://localhost:4168)
   - You should be able to follow the link to login using the email **someone@acme.com**. The password would have made available in the slides deck. Otherwise, please feel free to ask for it from lee@yireh.sg.

## Next Steps

Congratulations on setting up the *admin* frontend successfully! 

You may proceed to [Step 3: Shopfront Frontend](../frontend-shop/)
