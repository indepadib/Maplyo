$git = "C:\Program Files\Git\cmd\git.exe"
& $git init
& $git config user.email "bot@antigravity.dev"
& $git config user.name "Antigravity Bot"
& $git remote add origin https://github.com/indepadib/Maplyo.git
& $git fetch origin
& $git reset --mixed origin/main
& $git add .
& $git commit -m "feat: SEO, i18n (es/ar), and dynamic pricing"
& $git push origin main
