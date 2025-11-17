# Migration Summary: Supabase → NeonDB + Vercel Blob

## ✅ What Has Been Changed

### 1. **Image Storage** (`utils/supabase.ts`)
- ❌ Removed: Supabase Storage client
- ✅ Added: Vercel Blob Storage implementation
- Functions `uploadImage()` and `deleteImage()` now use Vercel Blob
- **No changes needed** in `utils/actions.ts` - it automatically uses the new functions

### 2. **Environment Variables** (`.env`)
- ❌ Removed: `SUPABASE_PROJECT`, `SUPABASE_URL`, `SUPABASE_KEY`, `DB_PASSWORD`
- ✅ Updated: `DATABASE_URL` → Your NeonDB pooled connection
- ✅ Updated: `DIRECT_URL` → Your NeonDB direct connection (derived from your connection string)
- ✅ Added: `BLOB_READ_WRITE_TOKEN` → **YOU NEED TO ADD THIS** (see below)

### 3. **Next.js Config** (`next.config.mjs`)
- ❌ Removed: Supabase hostname from image domains
- ✅ Added: Vercel Blob Storage hostname pattern (`*.public.blob.vercel-storage.com`)

### 4. **Dependencies** (`package.json`)
- ❌ Removed: `@supabase/supabase-js`
- ✅ Added: `@vercel/blob`

### 5. **Prisma Schema** (`prisma/schema.prisma`)
- ✅ **No changes needed** - Already correctly configured with `DATABASE_URL` and `DIRECT_URL`

---

## 🔑 What You Need to Do

### Step 1: Get Vercel Blob Storage Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **store-next-beta**
3. Navigate to: **Settings** → **Storage** → **Blob**
4. If you don't have a Blob store yet:
   - Click **Create Database** or **Add Storage**
   - Select **Blob**
   - Create a new Blob store (name it anything, e.g., "product-images")
5. Copy the **Read/Write Token**
6. Add it to your `.env` file:
   ```
   BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx_xxxxx_xxxxx
   ```

### Step 2: Verify NeonDB Connection Strings

Your `.env` file already has:
- ✅ `DATABASE_URL` - Pooled connection (with `-pooler`)
- ✅ `DIRECT_URL` - Direct connection (without `-pooler`)

**Important**: Make sure the `DIRECT_URL` is correct. It should be the same as `DATABASE_URL` but without `-pooler` in the hostname.

If you need to get fresh connection strings:
1. Go to [Neon Console](https://console.neon.tech/)
2. Select your project
3. Go to **Connection Details**
4. Copy:
   - **Pooled connection** → `DATABASE_URL`
   - **Direct connection** → `DIRECT_URL`

### Step 3: Install Dependencies

Run these commands in your terminal:

```bash
npm install
npm uninstall @supabase/supabase-js
```

This will:
- Install `@vercel/blob` (already added to package.json)
- Remove `@supabase/supabase-js` (no longer needed)

### Step 4: Update Vercel Environment Variables

Since you're deploying to Vercel, add the new environment variable there:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select **store-next-beta** project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `BLOB_READ_WRITE_TOKEN` = (your token from Step 1)
   - Update `DATABASE_URL` = (your NeonDB pooled connection)
   - Update `DIRECT_URL` = (your NeonDB direct connection)
5. Remove old Supabase variables:
   - `SUPABASE_URL`
   - `SUPABASE_KEY`
   - `SUPABASE_PROJECT`

### Step 5: Run Prisma Migrations

```bash
npx prisma generate
npx prisma db push
```

This will:
- Generate Prisma Client with new database connection
- Push schema to NeonDB (if needed)

### Step 6: Test the Application

1. **Test Image Upload**:
   - Go to `/admin/products/create`
   - Try uploading a product image
   - Verify it uploads successfully

2. **Test Product Operations**:
   - Create a new product
   - Edit an existing product
   - Delete a product (should delete image too)

3. **Test Database Operations**:
   - Browse products
   - Add to cart
   - Create orders
   - All should work with NeonDB

---

## 📋 Checklist

- [ ] Get `BLOB_READ_WRITE_TOKEN` from Vercel Dashboard
- [ ] Add `BLOB_READ_WRITE_TOKEN` to `.env` file
- [ ] Verify `DATABASE_URL` and `DIRECT_URL` in `.env` are correct
- [ ] Run `npm install` and `npm uninstall @supabase/supabase-js`
- [ ] Update environment variables in Vercel Dashboard
- [ ] Run `npx prisma generate` and `npx prisma db push`
- [ ] Test image uploads
- [ ] Test all database operations
- [ ] Deploy to Vercel and verify production works

---

## ⚠️ Important Notes

1. **Existing Images**: Images previously stored in Supabase will not be accessible. You'll need to:
   - Re-upload images through the admin panel, OR
   - Migrate images manually from Supabase to Vercel Blob

2. **Database Migration**: If you have existing data in Supabase database:
   - Export data from Supabase
   - Import into NeonDB
   - See NeonDB migration guide for details

3. **No Code Changes**: All your existing components, types, and workflows remain exactly the same. Only the underlying storage implementation changed.

4. **File Structure**: The file `utils/supabase.ts` still exists (for backward compatibility), but now uses Vercel Blob instead of Supabase.

---

## 🎯 Expected Result

After completing these steps:
- ✅ Database operations use NeonDB
- ✅ Image uploads use Vercel Blob Storage
- ✅ All existing functionality works the same
- ✅ Application runs on https://store-next-beta.vercel.app/
- ✅ No breaking changes to your codebase

---

## 📚 Additional Resources

- [NeonDB Documentation](https://neon.tech/docs)
- [Vercel Blob Storage Documentation](https://vercel.com/docs/storage/vercel-blob)
- [Prisma with NeonDB](https://neon.tech/docs/guides/prisma)

---

**Need Help?** Check the `MIGRATION_GUIDE.md` for detailed explanations of each step.

