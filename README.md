# Co-Pilot - Personal Cloud Learning Site

This repo contains a simple `index.html` that describes my cloud learning, projects, certifications, and a small Jest test suite plus a GitHub Actions workflow.

How to push to GitHub (quick)
1. Open PowerShell in this folder.
2. Option A — run the helper script (it will prompt for repo/user):

```powershell
.\push-to-github.ps1
```

Option B — manual commands:

```powershell
git init
git add .
git commit -m "Initial site, tests and CI"
git remote add origin https://github.com/<username>/<repo>.git
git branch -M main
git push -u origin main
```

Running tests locally

```powershell
npm install
npm test
```

CI

On push to `main` GitHub Actions runs the `nodejs-ci` workflow which installs dependencies and runs tests.
