This is a [Next.js](https://nextjs.org) portfolio project with optional Payload CMS content.

## Content Mode

By default, the site runs in local-content mode (no CMS/database fetch required).

- `NEXT_PUBLIC_USE_CMS_CONTENT=false` (default): local data + local images from `public/`
- `NEXT_PUBLIC_USE_CMS_CONTENT=true`: enable Payload CMS queries for content

If you want to use `/admin` and load content from Payload, set:

```bash
NEXT_PUBLIC_USE_CMS_CONTENT=true
```

and ensure your Payload/Mongo environment variables are configured.

## Payload Setup (Fresh)

Create `.env.local` with:

```bash
PAYLOAD_SECRET=replace-with-a-long-random-secret
DATABASE_URI=mongodb://127.0.0.1:27017/portfolio
NEXT_PUBLIC_USE_CMS_CONTENT=true
PAYLOAD_ADMIN_EMAIL=admin@example.com
PAYLOAD_ADMIN_PASSWORD=ChangeMe123!
```

Then run:

```bash
npm run payload:seed
npm run payload:admin
npm run dev
```

Access:

- Site: [http://localhost:3000](http://localhost:3000)
- Payload Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Payload Debug Mode

To enable verbose Payload diagnostics in server and browser consoles:

```bash
PAYLOAD_DEBUG=true
NEXT_PUBLIC_PAYLOAD_DEBUG=true
```

With these enabled, the app logs:
- Payload init state (env presence, collection count)
- Admin server-function lifecycle
- Admin page metadata/render lifecycle
- Payload REST route request/response/error traces
- Browser runtime `window.onerror` and `unhandledrejection` events

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

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.
