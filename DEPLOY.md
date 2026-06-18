# Deploy SHR3D_IT

Run these steps in PowerShell from the project folder.

## 1. GitHub — one-time login

If `gh` is not recognized, use the full path (GitHub CLI is installed here):

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" auth login
```

Or **restart Cursor** / open a new terminal — that often picks up PATH after install.

Choose:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser** (easiest)

## 2. Create repo and push

```powershell
cd "c:\Users\mrste\OneDrive\Shr3dIt"
.\scripts\push-to-github.ps1
```

Or manually:

```powershell
& "C:\Program Files\GitHub CLI\gh.exe" repo create Shr3dIt --public --source=. --remote=origin --push --description "Tactical fitness app (Next.js)"
```

If the repo name `Shr3dIt` is taken, pick another name and run:

```powershell
gh repo create YOUR-REPO-NAME --public --source=. --remote=origin --push
```

## 3. Vercel — import from GitHub (recommended)

1. Open https://vercel.com/new
2. Sign in with GitHub
3. Import **Shr3dIt**
4. Keep defaults (Framework: Next.js) → **Deploy**
5. After deploy, open **Project → Storage → Create Database → Postgres**
6. Connect the database to this project (adds `DATABASE_URL`)
7. **Settings → Environment Variables** → add:
   - `GEMINI_API_KEY` = your key from [Google AI Studio](https://aistudio.google.com/apikey)
8. **Deployments → Redeploy** (so env vars apply)

## 4. Alternative — deploy from CLI

```powershell
cd "c:\Users\mrste\OneDrive\Shr3dIt"
npx vercel login
npx vercel --prod
```

Then add Postgres + `GEMINI_API_KEY` in the Vercel dashboard and redeploy.

## Verify

- App loads at your `*.vercel.app` URL
- **Strength** tab works offline (no DB needed)
- **Archive** saves notes after Postgres is connected
- **Mind / Spirit** work after `GEMINI_API_KEY` is set
