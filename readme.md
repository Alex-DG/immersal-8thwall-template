# Immersal AR 8thWall Template

## Description

- Minimal reusable template project using Immersal AR and 8th Wall with Three.js

## Setup

1. Create a new file `.env.local` in the project root and add inside your 8th Wall key, Immersal developer token and a map id , such as:

```
VITE_8THWALL_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
VITE_IMMERSAL_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
VITE_MAP_ID=xxxxx
```

2. Run the following commands:

```bash
# Install dependencies (only the first time)
yarn

# Run the local server
yarn dev

# Build for production in the dist/ directory
yarn build
```
