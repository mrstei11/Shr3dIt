# SHR3D_IT

Tactical fitness app — migrated from the original R Shiny mockup to **Next.js** for deployment on [Vercel](https://vercel.com).

## Features

- **Strength** — 12-week progressive program, stopwatch, muscle radar, workout checklist, exercise guides
- **The Loadout** — build custom workouts from the exercise armory
- **Intel Archive** — private workout notes per user (email/password login)
- **Mind / Spirit** — Gemini AI via secure server-side API routes
- **Fuel** — nutrition targets and example day

## Local development

```bash
npm install
cp .env.example .env.local
# Add GEMINI_API_KEY and Postgres vars from Vercel dashboard
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Vercel deployment

1. Push this repo to GitHub
2. Import the project in Vercel
3. Add **Vercel Postgres** (Storage → Create → Postgres) — `DATABASE_URL` is injected automatically
4. Add `GEMINI_API_KEY` in Project Settings → Environment Variables
5. Add `AUTH_SECRET` — a random string (run `openssl rand -base64 32` locally)
6. Add `RESEND_API_KEY` from [resend.com](https://resend.com) for password reset emails
7. Add `NEXT_PUBLIC_APP_URL` = `https://shr3d-it.vercel.app` (your production URL)
8. **Deployments → Redeploy** (so env vars apply)

The `notes` table is created automatically on first API call. You can also run `sql/schema.sql` manually in the Vercel Postgres SQL console.

## Original Shiny app

The R Shiny prototype is preserved in `shiny-reference/app.R` for reference.

## Security

Never commit API keys. Rotate your Gemini key if it was previously stored in source code.
