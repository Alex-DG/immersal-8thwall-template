export const initImmersalPipelineModule = () => {
  return {
    name: 'immersal',

    // https://www.8thwall.com/docs/web/#onprocesscpu
    onProcessCpu: ({ processGpuResult }) => {
      const { gltexturerenderer } = processGpuResult

      if (!gltexturerenderer || !gltexturerenderer?.viewport) return

      const { viewport } = gltexturerenderer
      return { viewport }
    },

    // https://www.8thwall.com/docs/web/#onupdate
    onUpdate: ({ processCpuResult }) => {
      if (!processCpuResult.reality) return

      const { intrinsics } = processCpuResult.reality
      const { viewport } = processCpuResult.immersal

      const px = viewport.width * 0.5 * (1 - intrinsics[8]) + viewport.offsetX
      const py = viewport.height * 0.5 * (1 - intrinsics[9]) + viewport.offsetY

      // Principal point in pixels
      const principalOffset = {
        x: px,
        y: py,
      }

      // const fX = viewport.width * 0.5 * intrinsics[0]
      const fy = viewport.height * 0.5 * intrinsics[5]

      // Focal lengths in pixels
      const focalLength = {
        x: fy,
        y: fy,
      }

      const xrScene = XR8.Threejs.xrScene()
      xrScene.principalOffset = principalOffset
      xrScene.focalLength = focalLength
    },
  }
}
