@echo off
REM Run from project root after: gh auth login

cd /d "%~dp0"

echo Checking GitHub auth...
gh auth status
if errorlevel 1 (
  echo.
  echo Not logged in. Run: gh auth login
  exit /b 1
)

echo.
echo Creating GitHub repo and pushing...
gh repo create Shr3dIt --public --source=. --remote=origin --push --description "Tactical fitness app (Next.js)"
if errorlevel 1 (
  echo.
  echo If the name is taken, run:
  echo   gh repo create YOUR-NAME --public --source=. --remote=origin --push
  exit /b 1
)

echo.
echo Done! Open https://vercel.com/new to import the repo.
