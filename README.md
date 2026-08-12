# My Portfolio

Personal portfolio site built with Next.js, TypeScript, Tailwind CSS, and a
Postgres-backed admin dashboard for editing content without touching code.

## Stack

- **Next.js** (App Router) + **TypeScript** + **Tailwind CSS**
- **Prisma** + **Postgres** (Neon, via Vercel Storage) for content
- A password-protected `/admin` dashboard for editing Profile, Skills,
  Projects, and Experience — changes appear on the public site immediately

## Local development

```bash
npm install
npm run dev
```

Requires a `.env` file (not committed) with:

```
DATABASE_URL=...
DATABASE_URL_UNPOOLED=...
ADMIN_PASSWORD=...
SESSION_SECRET=...
```

`DATABASE_URL`/`DATABASE_URL_UNPOOLED` come from the Vercel Postgres
(Neon) integration. `ADMIN_PASSWORD` is whatever password you want to log
into `/admin` with. `SESSION_SECRET` is any long random string (used to
sign the admin session cookie) — generate one with:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

The same four variables need to be added in **Vercel → Project Settings →
Environment Variables** for the live site (`DATABASE_URL`/`DATABASE_URL_UNPOOLED`
are added automatically when you connect Postgres storage; `ADMIN_PASSWORD`
and `SESSION_SECRET` need to be added manually).

## Editing content

Visit `/admin` on the deployed site (or `localhost:3000/admin` locally),
log in with `ADMIN_PASSWORD`, and edit Profile / Skills / Projects /
Experience. Every save writes straight to Postgres, and the public pages
read live from the database — no redeploy needed.

## Database schema changes

If you ever change `prisma/schema.prisma`, apply it with:

```bash
npx prisma db push
```

## Deployment

Deployed on Vercel, connected to the `main` branch on GitHub — every push
auto-builds and deploys.
