@echo off
REM Run from project root after logging in (see DEPLOY.md)

cd /d "%~dp0.."

set "GH=C:\Program Files\GitHub CLI\gh.exe"
if not exist "%GH%" (
  echo GitHub CLI not found at: %GH%
  echo Install from: https://cli.github.com/
  exit /b 1
)

echo Checking GitHub auth...
"%GH%" auth status
if errorlevel 1 (
  echo.
  echo Not logged in. Run:
  echo   "%GH%" auth login
  exit /b 1
)

echo.
echo Creating GitHub repo and pushing...
"%GH%" repo create Shr3dIt --public --source=. --remote=origin --push --description "Tactical fitness app (Next.js)"
if errorlevel 1 (
  echo.
  echo If the name is taken, run:
  echo   "%GH%" repo create YOUR-NAME --public --source=. --remote=origin --push
  exit /b 1
)

echo.
echo Done! Open https://vercel.com/new to import the repo.
