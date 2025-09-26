<#
Simple PowerShell helper to commit local changes, add remote and push to GitHub.
Usage: run this script from the project root (where .git is or will be).
It will prompt for a remote URL or GitHub repo name and perform safe steps.
#>

param(
    [string]$RepoName,
    [string]$RemoteUrl
)

function Confirm-Exit($msg){
    Write-Host $msg -ForegroundColor Yellow
    exit 1
}

Set-Location -Path (Split-Path -Path $MyInvocation.MyCommand.Definition -Parent)

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Confirm-Exit "Git is not installed or not in PATH. Install Git and re-run the script."
}

if (-not (Test-Path .git)) {
    Write-Host "No git repo found — initializing a new repo..."
    git init
}

Write-Host "Staging all changes..."
git add .

$defaultMsg = "Update site: add projects, certifications, tests and CI workflow"
$msg = Read-Host "Enter commit message (press Enter for default)"
if ([string]::IsNullOrWhiteSpace($msg)) { $msg = $defaultMsg }

Write-Host "Committing with message: $msg"
git commit -m "$msg" 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit or commit failed — continuing." -ForegroundColor Yellow
}

if (-not $RemoteUrl) {
    if (-not $RepoName) {
        $RepoName = Read-Host "Enter GitHub repository name (e.g. Azure)"
    }
    $username = Read-Host "Enter your GitHub username (e.g. awwaladeyemo)"
    if (-not $RemoteUrl) { $RemoteUrl = "https://github.com/$username/$RepoName.git" }
}

if (-not (git remote)) {
    Write-Host "Adding remote origin -> $RemoteUrl"
    git remote add origin $RemoteUrl
} else {
    Write-Host "Remote(s) already set:"; git remote -v
    $useExisting = Read-Host "Use existing remote? (y/n)"
    if ($useExisting -ne 'y') {
        git remote remove origin -ErrorAction SilentlyContinue
        git remote add origin $RemoteUrl
    }
}

Write-Host "Setting main as the branch and pushing to origin..."
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Push completed. Visit https://github.com/$username/$RepoName to verify." -ForegroundColor Green
} else {
    Write-Host "Push failed — check authentication (use PAT or gh auth) and remote settings." -ForegroundColor Red
}
