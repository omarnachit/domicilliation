# Setup Guide

This guide will help you get the Domiciliation SaaS project up and running on your local machine. You can choose between a **Local Development** setup (using Docker) or a **Standard Development** setup (using a remote Supabase instance).

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v20 or higher)
- [Git](https://git-scm.com/)

---

## 🚀 Option A: Local Development (Docker-based)
*Recommended for local testing and isolated development.*

### 1. Prerequisites (Additional)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### 2. Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### 3. Start Local Supabase
Ensure Docker is running, then execute:
```bash
npx supabase start
```

### 4. Update `.env.local`
Based on the output of the `supabase start` command, update your `.env.local`. **Note: The ports might vary depending on your system; always use the specific URLs and keys provided in your terminal output.**

Typical values:
- `NEXT_PUBLIC_SUPABASE_URL`: `http://127.0.0.1:54321` (API URL)
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: (From output)
- `SUPABASE_SERVICE_ROLE_KEY`: (From output)
- `DATABASE_URL`: `postgresql://postgres:postgres@127.0.0.1:54322/postgres` (DB URL)

### 5. Start the Application
```bash
npm run dev
```

---

## 🌐 Option B: Standard Setup (Remote Supabase)
*Use this if you already have a Supabase project created on [supabase.com](https://supabase.com).*

### 1. Initial Setup
```bash
# Clone the repository
git clone <repository-url>
cd <project-directory>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
```

### 2. Update `.env.local`
Fill in the credentials from your Supabase Project Settings (API):
- `NEXT_PUBLIC_SUPABASE_URL`: Your project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your project `anon` key
- `SUPABASE_SERVICE_ROLE_KEY`: Your project `service_role` key
- `DATABASE_URL`: Your project connection string (Transaction mode recommended)

### 3. Start the Application
```bash
npm run dev
```

---

## Project Structure

- `src/app`: Next.js App Router pages and layouts.
- `src/components`: UI components (using Radix UI and Tailwind CSS).
- `src/lib`: Shared utilities, Supabase client initialization.
- `supabase/migrations`: SQL migration files for the database schema.
- `supabase/seed.sql`: Initial data for the database.

## Troubleshooting

- **Supabase not starting (Option A)**: Ensure Docker Desktop is running.
- **Environment variables**: Ensure all variables in `.env.local` are correctly set.
- **Port conflicts**: Check if port 3000 (Next.js) or 54321 (Supabase) is already in use.
