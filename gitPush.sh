#!/bin/bash

# Check if commit message is provided
if [ -z "$1" ]; then
  echo "Error: Commit message is required."
  echo "Usage: ./git-deploy.sh \"Your commit message\""
  exit 1
fi

# Git commands
git add .
git commit -m "$1"
git push origin master

echo "Pushed with message "$1" successfully"
