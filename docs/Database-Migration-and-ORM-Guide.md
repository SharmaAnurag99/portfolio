# Database Migration & ORM Guide for Payload CMS 3.0

Your project currently uses **MongoDB** via `@payloadcms/db-mongodb`. This guide covers how to switch databases and how to add an ORM like Prisma alongside Payload.

---

## 🧠 How Payload Handles Databases (Mental Model)

Payload CMS doesn't talk to databases directly. It uses **database adapters** — swappable plugins that translate Payload's internal operations into database-specific queries.

```
Your Code → Payload API → Database Adapter → Actual Database
                              ↑
                        (swap this part)
```

**Key insight:** Payload's SQL adapters (Postgres, SQLite) use **Drizzle ORM** under the hood. So when you switch to Postgres, you're already using an ORM — you just don't see it. MongoDB uses Mongoose under the hood.

### Available Official Adapters

| Adapter | Package | Database | ORM Under The Hood | Best For |
|---------|---------|----------|-------------------|----------|
| MongoDB | `@payloadcms/db-mongodb` | MongoDB Atlas, local MongoDB | Mongoose | Quick start, flexible schemas |
| Postgres | `@payloadcms/db-postgres` | PostgreSQL, Supabase, Neon, Railway | Drizzle | Relational data, production apps |
| Vercel Postgres | `@payloadcms/db-vercel-postgres` | Vercel Postgres (Neon) | Drizzle | Deployed on Vercel |
| SQLite | `@payloadcms/db-sqlite` | Local SQLite file | Drizzle | Zero-config local dev, embedded |

> ⚠️ **Cloudflare D1** is SQLite-based but there is no official Payload adapter for D1 yet. See the D1 section below for workarounds.

---

## Migration 1: MongoDB → PostgreSQL

### Why Switch?
- Postgres enforces **strict schemas** (fewer bugs from messy data)
- Better **relational queries** (JOINs instead of embedded documents)
- More hosting options: Supabase (free tier), Neon (free tier), Railway, Render, AWS RDS
- Industry standard for production apps

### Step-by-Step

#### 1. Install the Postgres adapter, uninstall MongoDB

```bash
npm uninstall @payloadcms/db-mongodb
npm install @payloadcms/db-postgres
```

#### 2. Update `payload.config.ts`

```typescript
// ❌ Remove this
import { mongooseAdapter } from '@payloadcms/db-mongodb'

// ✅ Add this
import { postgresAdapter } from '@payloadcms/db-postgres'

export default buildConfig({
    // ... everything else stays exactly the same ...

    // ❌ Remove this
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
    }),

    // ✅ Replace with this
    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URI || '',
        },
    }),
})
```

#### 3. Update `.env.local`

```env
# ❌ Old MongoDB URI
# DATABASE_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio

# ✅ New Postgres URI
DATABASE_URI=postgresql://user:password@host:5432/portfolio
```

**Free Postgres hosting options:**
- **Supabase**: [supabase.com](https://supabase.com) → New Project → Settings → Database → Connection String
- **Neon**: [neon.tech](https://neon.tech) → Create DB → Copy connection string
- **Railway**: [railway.app](https://railway.app) → New → Database → PostgreSQL

#### 4. Run the dev server

```bash
npm run dev
```

Payload will auto-create all the required tables (users, media, testimonials, etc.) on first run. Your collections automatically become SQL tables!

> **Note:** This does NOT migrate your existing MongoDB data to Postgres. You start fresh. If you need to move data, export from MongoDB (via Payload admin panel → each collection → export) and re-import into Postgres.

---

## Migration 2: MongoDB → SQLite (Zero-Config Local DB)

### Why Switch?
- **No cloud database needed** — it's just a file on your machine
- Perfect for local development & prototyping
- Zero configuration, zero accounts to create
- Can later switch to Postgres for production

### Step-by-Step

#### 1. Swap the adapter

```bash
npm uninstall @payloadcms/db-mongodb
npm install @payloadcms/db-sqlite
```

#### 2. Update `payload.config.ts`

```typescript
import { sqliteAdapter } from '@payloadcms/db-sqlite'

export default buildConfig({
    // ... everything else stays the same ...

    db: sqliteAdapter({
        client: {
            url: process.env.DATABASE_URI || 'file:./payload.db',
        },
    }),
})
```

#### 3. Update `.env.local`

```env
# Points to a local file — that's your entire database!
DATABASE_URI=file:./payload.db
```

That's it. No cloud setup. A `payload.db` file will appear in your project root.

---

## Migration 3: Using Cloudflare D1

### The Reality
Cloudflare D1 is built on SQLite, but Payload CMS does **not** have an official D1 adapter yet. Here are your options:

### Option A: Use D1 for your OWN custom data + MongoDB/Postgres for Payload
Keep Payload on MongoDB or Postgres, but use D1 for any custom non-CMS data via Prisma (see below).

### Option B: Wait for Community Adapter
The Payload community is working on D1 support. Check [github.com/payloadcms/payload](https://github.com/payloadcms/payload/issues) for updates.

### Option C: Use Turso (D1 Alternative)
Turso is a hosted SQLite-compatible database (like D1 but works with more tools). You can use it with `@payloadcms/db-sqlite` by setting:

```env
DATABASE_URI=libsql://your-db-name-your-org.turso.io?authToken=your-token
```

---

## Adding Prisma ORM Alongside Payload

### 🧠 When Would You Want This?
Payload manages CMS data (testimonials, projects, blog posts). But what if you need data that Payload doesn't manage? Examples:
- **Analytics** (page views, click tracking)
- **Contact form submissions** stored in your own table
- **User-generated content** that isn't CMS content
- **Custom business logic** with complex relational queries

Prisma runs **alongside** Payload — they use the same database but manage different tables.

```
┌──────────────────────────────────────────┐
│              Your Database               │
│                                          │
│  ┌─── Payload Tables ───┐  ┌── Prisma ──┐│
│  │ users                │  │ analytics  ││
│  │ media                │  │ contacts   ││
│  │ testimonials         │  │ page_views ││
│  │ projects             │  │            ││
│  └──────────────────────┘  └────────────┘│
└──────────────────────────────────────────┘
```

### Step-by-Step: Adding Prisma

#### 1. Install Prisma

```bash
npm install prisma @prisma/client
npx prisma init
```

This creates:
- `prisma/schema.prisma` — your Prisma schema file
- Updates `.env` with a `DATABASE_URL` variable

#### 2. Configure `prisma/schema.prisma`

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"   // or "mongodb" or "sqlite"
  url      = env("DATABASE_URL")
}

// Define YOUR tables (not Payload's — Payload manages its own)
model ContactSubmission {
  id        String   @id @default(cuid())
  name      String
  email     String
  message   String
  createdAt DateTime @default(now())
}

model PageView {
  id        String   @id @default(cuid())
  page      String
  userAgent String?
  visitedAt DateTime @default(now())
}
```

#### 3. Add `DATABASE_URL` to `.env.local`

Point it to the **same database** as Payload (or a different one):

```env
# Payload uses this
DATABASE_URI=postgresql://user:pass@host:5432/portfolio

# Prisma uses this (can be the same DB!)
DATABASE_URL=postgresql://user:pass@host:5432/portfolio
```

#### 4. Push the schema to the database

```bash
npx prisma db push
```

This creates the `ContactSubmission` and `PageView` tables without touching Payload's tables.

#### 5. Generate the Prisma Client

```bash
npx prisma generate
```

#### 6. Create a shared Prisma client

Create `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Reuse the client in dev to avoid creating too many connections
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
```

> **Why the `globalThis` trick?** In development, Next.js hot-reloads your code. Every reload would create a NEW Prisma connection, eventually exhausting your database connections. By storing the client on `globalThis`, we reuse the same connection across hot reloads.

#### 7. Use Prisma in your components

```typescript
// src/app/api/contact/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  
  // Save to YOUR Prisma table
  const submission = await prisma.contactSubmission.create({
    data: {
      name: body.name,
      email: body.email,
      message: body.message,
    },
  })

  return NextResponse.json({ success: true, id: submission.id })
}
```

#### 8. View your data

```bash
npx prisma studio
```

This opens a browser UI at `localhost:5555` where you can browse your Prisma-managed tables.

---

## Prisma vs Drizzle — Which ORM?

Since Payload already uses **Drizzle** under the hood (for Postgres/SQLite adapters), you could also use Drizzle directly instead of Prisma.

| Feature | Prisma | Drizzle |
|---------|--------|---------|
| Learning Curve | Easier (schema file is very readable) | Steeper (more code-first) |
| Type Safety | Excellent | Excellent |
| Performance | Good (query engine adds overhead) | Better (compiles to raw SQL) |
| Schema Management | `prisma migrate` / `prisma db push` | `drizzle-kit push` |
| Already in your project? | No (you'd add it) | Yes (Payload uses it internally) |
| Best for | Beginners, rapid prototyping | Performance-sensitive, advanced use |

### If You Prefer Drizzle Instead of Prisma

Since Payload's SQL adapters already include Drizzle, you can access it:

```typescript
import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })

// Access the raw Drizzle instance
const db = payload.db.drizzle

// Now you can write raw Drizzle queries
// (You'll need to define your own Drizzle schema for custom tables)
```

---

## Quick Decision Tree

```
Do you want CMS-managed data (editable from /admin)?
  → YES → Define a Payload Collection (no ORM needed!)
  → NO → Do you need a database for custom data?
            → YES → Which ORM?
                      → Easy setup → Use Prisma
                      → Max performance → Use Drizzle (already in your project)
            → NO → You're done!

Which database?
  → Just getting started / local dev → SQLite
  → Free cloud hosting → Supabase Postgres or Neon
  → Already using MongoDB Atlas → Stay with MongoDB
  → Deploying to Vercel → Vercel Postgres or Neon
  → Deploying to Cloudflare → Turso (SQLite-compatible)
```
