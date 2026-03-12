# MongoDB Atlas Setup & Database Configuration Guide

This guide walks you through creating a free MongoDB Atlas database and connecting it to your Payload CMS portfolio.

---

## Part 1: Creating a Free MongoDB Atlas Database

### Step 1: Create an Account
1. Go to [mongodb.com/atlas](https://www.mongodb.com/atlas/database)
2. Click **"Try Free"** → sign up with Google or email
3. Choose the **FREE / M0** tier (no credit card needed)

### Step 2: Create a Cluster
1. After signing in, click **"Build a Database"**
2. Select **M0 Free** tier
3. Pick a cloud provider (AWS is fine) and a region **closest to you** (e.g., Mumbai `ap-south-1`)
4. Name your cluster (e.g., `portfolio-cluster`) → Click **"Create Deployment"**

### Step 3: Create a Database User
1. Go to **Security → Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Set a username (e.g., `anurag`) and a strong password
5. Under **"Database User Privileges"**, select **"Read and write to any database"**
6. Click **"Add User"**

> ⚠️ **Remember this username and password** — you'll paste them into your connection string.

### Step 4: Allow Network Access
1. Go to **Security → Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. For development, click **"Allow Access from Anywhere"** (`0.0.0.0/0`)
4. Click **"Confirm"**

> For production, restrict this to your server's IP only.

### Step 5: Get Your Connection String
1. Go to **Deployment → Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Drivers"**
4. Copy the connection string — it looks like:
   ```
   mongodb+srv://anurag:<password>@portfolio-cluster.abc123.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you created in Step 3
6. Add a database name after `.net/` — e.g., change `/?retryWrites` to `/portfolio?retryWrites`

Your final string should look like:
```
mongodb+srv://anurag:MyStr0ngP@ss@portfolio-cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Part 2: Connect It to Your Project

### Step 1: Generate a Payload Secret
Run this in your terminal:
```bash
openssl rand -hex 32
```
Copy the output (it'll be a long hex string like `a3f8d2e1b9c7...`).

### Step 2: Update `.env.local`
Open `.env.local` at the root of your project and update these two lines:

```env
PAYLOAD_SECRET=<paste_the_hex_from_above>
DATABASE_URI=mongodb+srv://anurag:MyStr0ngP@ss@portfolio-cluster.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Step 3: Test the Connection
```bash
npm run dev
```
Then open `http://localhost:3000/admin`. If you see the "Create First User" screen, **it worked!**

---

## Part 3: Switching to a Different Database

If you ever want to change databases (e.g., from dev to production, or switching providers):

### Option A: Different MongoDB Atlas Cluster
1. Just change the `DATABASE_URI` in `.env.local` to the new connection string
2. Restart the dev server (`npm run dev`)
3. Payload will auto-create collections in the new database on first run

### Option B: Switch from MongoDB to Postgres
1. Install the Postgres adapter:
   ```bash
   npm uninstall @payloadcms/db-mongodb
   npm install @payloadcms/db-postgres
   ```
2. Update `payload.config.ts`:
   ```typescript
   // Replace this:
   import { mongooseAdapter } from '@payloadcms/db-mongodb'
   // With this:
   import { postgresAdapter } from '@payloadcms/db-postgres'

   // And in buildConfig, replace:
   db: mongooseAdapter({ url: process.env.DATABASE_URI || '' })
   // With:
   db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URI || '' } })
   ```
3. Update `DATABASE_URI` in `.env.local` to a Postgres connection string:
   ```env
   DATABASE_URI=postgresql://user:password@host:5432/portfolio
   ```

### Option C: Use Local MongoDB (No Cloud)
1. Install MongoDB locally:
   ```bash
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```
2. Set your connection string to local:
   ```env
   DATABASE_URI=mongodb://localhost:27017/portfolio
   ```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `MongoServerError: bad auth` | Wrong username/password in connection string |
| `MongoNetworkError: connection refused` | IP not whitelisted in Network Access |
| `ECONNREFUSED 127.0.0.1:27017` | Local MongoDB not running (`brew services start mongodb-community`) |
| Admin panel loads but can't save | Check if database user has read/write permissions |
