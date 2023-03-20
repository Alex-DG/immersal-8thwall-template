# Prototype: Immersal AR + 8thWall Template

## Description

- Minimal reusable template project using Immersal AR and 8th Wall with Three.js

## Demos

- Indoor: [living room](https://youtu.be/jEivuCRbyJ8)

- Outdoor: [Akabane 1](https://twitter.com/Alex_dg_dev/status/1606191289334054912) | [Akabane 2](https://www.youtube.com/shorts/ex6uKcpv-zo) | [Shibuya 1](https://twitter.com/Alex_dg_dev/status/1611259886565994497) | [Shibuya 2](https://twitter.com/Alex_dg_dev/status/1611260743672016897)


## Setup

1. Create a new file `.env.local` in the project root and add inside your 8th Wall key, Immersal developer token and a map id , such as:

```
VITE_8THWALL_APP_KEY=xxxxxxxxxxxxxxxxxxxxxxxxx
VITE_IMMERSAL_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxx
VITE_MAP_ID=xxxxx
```

2. In your 8th Wall project: do not forget to add your local ip address in the list of authorized domains within your 8th Wall Project in Hosting > Edit > add your local ip address

3. Run the following commands:

```bash
# Install dependencies (only the first time)
yarn

# Run the local server
yarn dev

# Build for production in the dist/ directory
yarn build
```
