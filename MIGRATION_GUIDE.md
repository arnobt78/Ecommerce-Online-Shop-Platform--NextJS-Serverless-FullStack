# Migration Guide: Supabase to NeonDB

## Overview
This guide explains the migration from Supabase to NeonDB and Vercel Blob Storage for image uploads.

---

## 🔑 Required Keys from NeonDB

### 1. **DATABASE_URL (Pooled Connection)**
- **Purpose**: Used by your application for regular database queries
- **Format**: Connection string with `-pooler` in the hostname
- **Your Value**: 
  ```
  DATABASE_URL="postgresql://neondb_owner:npg_qSvfab7kcP6L@ep-late-meadow-agr463w7-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  ```

### 2. **DIRECT_URL (Direct Connection)**
- **Purpose**: Used by Prisma for migrations and schema operations
- **Format**: Connection string WITHOUT `-pooler` in the hostname
- **How to Get**: In your NeonDB dashboard, go to your project → Connection Details → Copy the "Direct connection" string
- **Your Value** (derived from your DATABASE_URL):
  ```
  DIRECT_URL="postgresql://neondb_owner:npg_qSvfab7kcP6L@ep-late-meadow-agr463w7.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
  ```
  ⚠️ **Note**: Remove `-pooler` from the hostname to get the direct connection.

### 3. **How to Get These from NeonDB Dashboard**
1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project
3. Go to **Connection Details** or **Dashboard**
4. You'll see two connection strings:
   - **Pooled connection** (with `-pooler`) → Use for `DATABASE_URL`
   - **Direct connection** (without `-pooler`) → Use for `DIRECT_URL`

---

## 📦 Required Keys for Image Storage (Vercel Blob)

Since NeonDB doesn't provide image storage, we're using **Vercel Blob Storage** (perfect for Vercel deployments).

### **BLOB_READ_WRITE_TOKEN**
- **Purpose**: Authenticate image uploads and deletions
- **How to Get**:
  1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
  2. Select your project: `store-next-beta`
  3. Go to **Settings** → **Storage** → **Blob**
  4. Create a new Blob store (if not exists) or use existing one
  5. Copy the **Read/Write Token**
  6. Add to `.env` as: `BLOB_READ_WRITE_TOKEN=your_token_here`

---

## ✅ Environment Variables Summary

### **Remove from .env** (Supabase-related):
- ❌ `SUPABASE_PROJECT`
- ❌ `SUPABASE_URL`
- ❌ `SUPABASE_KEY`

### **Update in .env** (Database):
- ✅ `DATABASE_URL` → Your NeonDB pooled connection string
- ✅ `DIRECT_URL` → Your NeonDB direct connection string

### **Add to .env** (Image Storage):
- ✅ `BLOB_READ_WRITE_TOKEN` → From Vercel Blob Storage

### **Keep in .env** (Other services):
- ✅ `ADMIN_USER_ID` (Clerk)
- ✅ `NEXT_PUBLIC_WEBSITE_URL`
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (in .env.local)
- ✅ `CLERK_SECRET_KEY` (in .env.local)

---

## 🔄 Migration Steps

### Step 1: Get NeonDB Connection Strings
- Use the values provided above or get fresh ones from NeonDB dashboard

### Step 2: Set Up Vercel Blob Storage
- Follow the steps above to get `BLOB_READ_WRITE_TOKEN`

### Step 3: Update Environment Variables
- Update `.env` file with new values (see changes made in this migration)

### Step 4: Install Dependencies
```bash
npm install @vercel/blob
npm uninstall @supabase/supabase-js
```

### Step 5: Run Prisma Migrations
```bash
npx prisma generate
npx prisma db push
```

### Step 6: Test the Application
- Test image uploads in admin panel
- Test product creation/editing
- Verify all database operations work

---

## 📝 What Changed in the Code

1. **utils/supabase.ts** → Replaced with Vercel Blob Storage implementation
2. **utils/actions.ts** → Updated to use new image upload functions
3. **prisma/schema.prisma** → Already configured for NeonDB (no changes needed)
4. **next.config.mjs** → Removed Supabase hostname from image domains
5. **package.json** → Removed `@supabase/supabase-js`, added `@vercel/blob`
6. **.env** → Updated with NeonDB connection strings

---

## ⚠️ Important Notes

1. **Existing Images**: Images stored in Supabase will need to be migrated manually if you want to keep them. The new system will work for all new uploads.

2. **Database Migration**: If you have existing data in Supabase, you'll need to:
   - Export data from Supabase
   - Import into NeonDB
   - See NeonDB migration guide for details

3. **Vercel Deployment**: Make sure to add `BLOB_READ_WRITE_TOKEN` to your Vercel project environment variables.

4. **No Code Structure Changes**: All existing components, types, and workflows remain exactly the same. Only the underlying storage implementation changed.

---

## 🚀 After Migration

Your application will:
- ✅ Use NeonDB for all database operations
- ✅ Use Vercel Blob Storage for image uploads
- ✅ Maintain all existing functionality
- ✅ Work seamlessly on https://store-next-beta.vercel.app/

