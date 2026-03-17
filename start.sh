#!/bin/bash
# start.sh - Production-ready NestJS starter for Railway

echo "🚀 Installing dependencies..."
npm install --omit=dev

echo "📦 Building NestJS app..."
npm run build

echo "🎯 Starting NestJS app..."
node dist/main.js