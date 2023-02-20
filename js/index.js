import '../styles/index.css'

import { initThreeScenePipelineModule } from './pipelines/threeScenePipelineModule'
import { initWorldPipelineModule } from './pipelines/worldPipelineModule'
import { initImmersalPipelineModule } from './pipelines/immersalPipelineModule'

const onxrloaded = () => {
  XR8.XrController.configure({ scale: 'absolute' }) // See: https://www.8thwall.com/docs/web/#xr8xrcontroller

  XR8.addCameraPipelineModule(XR8.CanvasScreenshot.pipelineModule()) // A CanvasScreenshot pipeline module that can be added via XR8.addCameraPipelineModule().

  XR8.addCameraPipelineModules([
    XR8.GlTextureRenderer.pipelineModule(), // Draws the camera feed.
    XR8.CameraPixelArray.pipelineModule(), // A pipeline module that provides the camera texture as an array of RGBA by default

    initThreeScenePipelineModule(), // Create custom Three.js scene and camera.
    initWorldPipelineModule(), // Initialize 3D world's content
    initImmersalPipelineModule(), // Immersal AR setup

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
