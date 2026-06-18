# Use full path if `gh` is not recognized in your terminal
$Gh = "C:\Program Files\GitHub CLI\gh.exe"

if (-not (Test-Path $Gh)) {
  Write-Error "GitHub CLI not found. Install from https://cli.github.com/"
  exit 1
}

Set-Location $PSScriptRoot\..

Write-Host "Checking GitHub auth..." -ForegroundColor Cyan
& $Gh auth status
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "Not logged in. Run:" -ForegroundColor Yellow
  Write-Host "  & `"$Gh`" auth login"
  exit 1
}

Write-Host ""
Write-Host "Creating GitHub repo and pushing..." -ForegroundColor Cyan
& $Gh repo create Shr3dIt --public --source=. --remote=origin --push --description "Tactical fitness app (Next.js)"
if ($LASTEXITCODE -ne 0) {
  Write-Host ""
  Write-Host "If the name is taken, run:" -ForegroundColor Yellow
  Write-Host "  & `"$Gh`" repo create YOUR-NAME --public --source=. --remote=origin --push"
  exit 1
}

Write-Host ""
Write-Host "Done! Open https://vercel.com/new to import the repo." -ForegroundColor Green
