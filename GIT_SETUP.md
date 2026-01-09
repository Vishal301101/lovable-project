# Git Setup with Personal Account

## ✅ Git Configuration Complete

Your repository is now configured with your personal GitHub account:
- **Username**: Vishal301101
- **Email**: vishalmodhave2018@gmail.com
- **Initial commit**: Created ✅

This configuration is **repository-specific** and won't affect your company Git account.

## Next Steps: Push to GitHub

### Option 1: Create New Repository on GitHub (Recommended)

1. **Go to GitHub**: https://github.com/new
   - Make sure you're logged in with your **personal account** (Vishal301101)

2. **Create repository**:
   - Repository name: `lovable-project` (or any name you prefer)
   - Description: "React + TypeScript + Tailwind CSS project from Lovable"
   - Visibility: Choose **Public** or **Private**
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

3. **Copy the repository URL** (should look like):
   ```
   https://github.com/Vishal301101/lovable-project.git
   ```

4. **Run these commands** in your terminal:
   ```bash
   # Rename branch to main (recommended)
   git branch -M main

   # Add remote (replace with your actual repo URL)
   git remote add origin https://github.com/Vishal301101/lovable-project.git

   # Push to GitHub
   git push -u origin main
   ```

### Option 2: Use GitHub CLI (gh)

If you have GitHub CLI installed:

```bash
# Login with personal account
gh auth login

# Create repository and push
gh repo create lovable-project --public --source=. --remote=origin --push
```

## Authentication

When pushing, you'll need to authenticate. GitHub has two options:

### Option A: Personal Access Token (Recommended)

1. Go to: https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name it: "Lovable Project"
4. Select scopes: `repo` (full control of private repositories)
5. Generate and **copy the token**
6. When prompted for password during `git push`, paste the token

### Option B: SSH Key

1. Generate SSH key:
   ```bash
   ssh-keygen -t ed25519 -C "vishalmodhave2018@gmail.com"
   ```

2. Add to ssh-agent:
   ```bash
   eval "$(ssh-agent -s)"
   ssh-add ~/.ssh/id_ed25519
   ```

3. Copy public key:
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```

4. Add to GitHub: https://github.com/settings/keys
   - Click "New SSH key"
   - Paste the key
   - Save

5. Use SSH URL instead:
   ```bash
   git remote add origin git@github.com:Vishal301101/lovable-project.git
   git push -u origin main
   ```

## Verify Git Configuration

Check your local Git config (repository-specific):
```bash
git config --list --local
```

Should show:
```
user.name=Vishal301101
user.email=vishalmodhave2018@gmail.com
```

## Quick Commands Reference

```bash
# Check current status
git status

# View commit history
git log --oneline

# Check remote
git remote -v

# Push changes
git push

# Pull changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

## Deploy to Vercel from GitHub

Once pushed to GitHub:

1. Go to https://vercel.com
2. Sign up/login with GitHub
3. Click "Add New Project"
4. Import your repository: `Vishal301101/lovable-project`
5. Vercel auto-detects Vite settings
6. Click "Deploy"
7. Done! Your site will be live in ~1 minute

## Troubleshooting

### If you accidentally use wrong account:

```bash
# Remove the remote
git remote remove origin

# Check your local config
git config user.name
git config user.email

# If wrong, fix it
git config user.name "Vishal301101"
git config user.email "vishalmodhave2018@gmail.com"

# Amend the last commit with correct author
git commit --amend --reset-author --no-edit

# Re-add remote and push
git remote add origin <your-repo-url>
git push -u origin main
```

### Separate Work and Personal Git Configs

Your global Git config (for work):
```bash
git config --global user.name "Work Name"
git config --global user.email "work@company.com"
```

Repository-specific config (already done for this project):
```bash
git config user.name "Vishal301101"
git config user.email "vishalmodhave2018@gmail.com"
```

This way:
- Work repositories use your work account (global config)
- This repository uses your personal account (local config overrides global)

## Ready to Push!

Your repository is ready. Just create the GitHub repository and run:

```bash
git branch -M main
git remote add origin https://github.com/Vishal301101/<repo-name>.git
git push -u origin main
```

Happy coding! 🚀
