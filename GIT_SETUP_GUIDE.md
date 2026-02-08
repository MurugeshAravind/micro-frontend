# 📝 Step-by-Step: Publishing to GitHub

Follow these exact steps to publish your micro frontend example to GitHub.

## Prerequisites

- ✅ Git installed (`git --version`)
- ✅ GitHub account created
- ✅ Project files ready

## Step 1: Prepare Your Local Repository

```bash
# Navigate to your project folder
cd micro-frontend-example

# Initialize git (if not already done)
git init

# Check status
git status
```

## Step 2: Create .gitignore

Copy the `.gitignore` file to the root of your project:

```
micro-frontend-example/
├── .gitignore          ← Place here
├── app-a-host/
├── app-b-remote/
└── README.md
```

## Step 3: Stage All Files

```bash
# Add all files to git
git add .

# Verify what's being added
git status

# You should see:
# - app-a-host/
# - app-b-remote/
# - README.md
# - All documentation files
# 
# You should NOT see:
# - node_modules/
# - dist/
# - package-lock.json
```

## Step 4: Create Initial Commit

```bash
git commit -m "Initial commit: Micro frontend example with Module Federation

- App A (Host) on port 3000
- App B (Remote) on port 3001
- Complete documentation
- Working Module Federation setup"
```

## Step 5: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon (top right) → **"New repository"**
3. Fill in:
   - **Repository name**: `micro-frontend-example`
   - **Description**: `Webpack Module Federation example with React micro frontends`
   - **Public** or **Private**: Your choice
   - **DO NOT** check "Initialize with README" (you already have one)
4. Click **"Create repository"**

## Step 6: Link Local Repo to GitHub

GitHub will show you commands. Use these:

```bash
# Add GitHub as remote origin
git remote add origin https://github.com/YOUR-USERNAME/micro-frontend-example.git

# Verify remote was added
git remote -v

# Should show:
# origin  https://github.com/YOUR-USERNAME/micro-frontend-example.git (fetch)
# origin  https://github.com/YOUR-USERNAME/micro-frontend-example.git (push)
```

## Step 7: Push to GitHub

```bash
# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main

# Enter your GitHub credentials if prompted
```

## Step 8: Verify on GitHub

1. Go to `https://github.com/YOUR-USERNAME/micro-frontend-example`
2. You should see:
   - ✅ All your files
   - ✅ README.md displayed on the homepage
   - ✅ Proper folder structure
   - ✅ No node_modules or build files

## Step 9: Add Topics (Optional but Recommended)

On your GitHub repo page:
1. Click **"⚙️ Settings"** (or the gear icon near "About")
2. Add topics:
   - `micro-frontend`
   - `module-federation`
   - `webpack`
   - `react`
   - `example`
   - `tutorial`

## Step 10: Enable GitHub Pages (Optional)

If you want to host documentation:

1. Go to **Settings** → **Pages**
2. Source: **Deploy from a branch**
3. Branch: **main** → **/ (root)**
4. Click **Save**

## Future Updates

When you make changes:

```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit with message
git commit -m "Update: Description of changes"

# 4. Push to GitHub
git push
```

## Clone on Another Machine

Others (or you on another machine) can now:

```bash
git clone https://github.com/YOUR-USERNAME/micro-frontend-example.git
cd micro-frontend-example

# Install and run
cd app-b-remote && npm install && npm start
# In another terminal:
cd app-a-host && npm install && npm start
```

## Common Issues

### "Permission denied (publickey)"

**Solution**: Set up SSH keys or use HTTPS URL

```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/YOUR-USERNAME/micro-frontend-example.git
```

### "Repository not found"

**Solution**: Check the URL is correct

```bash
git remote -v
# Make sure YOUR-USERNAME is your actual GitHub username
```

### "node_modules/ is in the repo"

**Solution**: 
```bash
# Remove from git
git rm -r --cached node_modules
git rm -r --cached app-a-host/node_modules
git rm -r --cached app-b-remote/node_modules

# Make sure .gitignore has:
**/node_modules/

# Commit
git commit -m "Remove node_modules from git"
git push
```

## Best Practices

### ✅ DO:
- Commit frequently with clear messages
- Keep .gitignore updated
- Write descriptive README
- Add documentation
- Use semantic commit messages

### ❌ DON'T:
- Commit node_modules/
- Commit .env files with secrets
- Commit build artifacts (dist/, build/)
- Push large binary files
- Commit package-lock.json if using yarn/pnpm

## Semantic Commit Messages

```bash
git commit -m "feat: Add new component to App B"
git commit -m "fix: Resolve eager consumption error"
git commit -m "docs: Update README with new instructions"
git commit -m "refactor: Improve webpack configuration"
git commit -m "chore: Update dependencies"
```

## Success Checklist

- [ ] Repository created on GitHub
- [ ] Local repo initialized with git
- [ ] .gitignore properly configured
- [ ] All files committed
- [ ] Pushed to GitHub successfully
- [ ] README displays correctly
- [ ] No sensitive files committed
- [ ] Repository is public (or private if intended)

## 🎉 You're Done!

Your micro frontend example is now on GitHub! Share the link:

```
https://github.com/YOUR-USERNAME/micro-frontend-example
```

Others can now clone, learn from, and contribute to your project! 🚀
