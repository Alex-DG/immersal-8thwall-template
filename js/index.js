import '../styles/index.css'

import { initThreeScenePipelineModule } from './pipelines/threeScenePipelineModule'
import { initWorldPipelineModule } from './pipelines/worldPipelineModule'

const onxrloaded = () => {
  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    initThreeScenePipelineModule(), // Create custom Three.js scene and camera.
    initWorldPipelineModule(), // Initialize 3D world's content

    XR8.XrController.pipelineModule(), // Enables SLAM tracking.

    XRExtras.AlmostThere.pipelineModule(), // Detects unsupported browsers and gives hints.
    XRExtras.RuntimeError.pipelineModule(), // Shows an error image on runtime error.
    XRExtras.Loading.pipelineModule(), // Manages the loading screen on startup.
    XRExtras.FullWindowCanvas.pipelineModule(), // Modifies the canvas to fill the window.
  ])

  const canvas = document.getElementById('ar-canvas')

  // Open the camera and start running the camera run loop.
  XR8.run({ canvas })
}

window.onload = () => {
  window.XR8 ? onxrloaded() : window.addEventListener('xrloaded', onxrloaded)
}
