#!/bin/bash
# start.sh - Launch script for NestJS app

echo "Starting NestJS app..."

# Check for NestJS entry
if [ -f "src/main.ts" ]; then
    echo "Running NestJS using ts-node..."
    npx ts-node -r tsconfig-paths/register src/main.ts
    exit 0
fi

# Fallback for compiled JS (after tsc)
if [ -f "dist/main.js" ]; then
    echo "Running compiled NestJS app..."
    node dist/main.js
    exit 0
fi

echo "No recognized NestJS entry file found. Make sure src/main.ts exists."
exit 1