#!/bin/bash
# DefenseBudget Dash — Initialization Script
echo "Installing dependencies..."
npm install
echo "Running build check..."
npm run build
echo "Starting dev server..."
npm run dev
