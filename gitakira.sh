git fetch upstream
git checkout main
git merge upstream/main  # Assuming the default branch is 'main
git add .
git commit -m "Merge updates from upstream"
git push origin main
