// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import basicSsl from '@vitejs/plugin-basic-ssl'
import glsl from 'vite-plugin-glsl'

const htmlPlugin = (env) => {
  return {
    name: 'html-transform',
    transformIndexHtml: {
      transform: (html) =>
        html.replace(/%(.*?)%/g, (match, p1) => env[p1] ?? match),
    },
  }
}

export default defineConfig(({ mode }) => {
  return {
    plugins: [glsl(), basicSsl(), htmlPlugin(loadEnv(mode, '.'))],
    assetsInclude: [
      '**/*.glb',
      '**/*.gltf',
      '**/*.fbx',
      '**/*.mp4',
      '**/*.webp',
      '**/*.png',
      '**/*.jpg',
    ],
  }
})
