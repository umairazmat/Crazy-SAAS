This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

##clerk
Link: https://clerk.com/
npm install @clerk/nextjs
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\***\*<your-publishable-key>\*\***
CLERK_SECRET_KEY= \***\*<your-secret-key>\*\***
Create a middleware.ts file.
In your middleware.ts, export Clerk's clerkMiddleware() helper.
Add <ClerkProvider> and components to your app.

## cloudinary

link: https://cloudinary.com/

Build your own sign-in and sign-up pages for your Next.js app with Clerk
Link : https://clerk.com/docs/references/nextjs/custom-signup-signin-pages#update-your-environment-variables

##prisma
Link: https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql

npm install prisma --save-dev
npx prisma
npx prisma init
npx prisma migrate dev --name init

# chai docs

https://docs.chaicode.com/postgresql-installation/

##neon
https://neon.tech/docs/introduction
Just create postrgres database and copy the database url to .env file

Install Prisma Client
npm install @prisma/client
