export const initImmersalPipelineModule = () => {
  return {
    name: 'immersal',

    onProcessCpu: ({ processGpuResult }) => {
      const { camerapixelarray } = processGpuResult
      if (!camerapixelarray || !camerapixelarray.pixels) return

      const { rows, cols, pixels } = camerapixelarray
      return { rows, cols, pixels }
    },

    onUpdate: ({ frameStartResult, processCpuResult }) => {
      if (!processCpuResult.reality) return

      const { rotation, position, intrinsics } = processCpuResult.reality
      const { textureWidth, textureHeight } = frameStartResult
      const { rows, cols, pixels } = processCpuResult.immersal

      const xrScene = XR8.Threejs.xrScene()

      const fy = 0.5 * intrinsics[5] * textureWidth
      const cx = 0.5 * (intrinsics[8] + 1.0) * textureWidth
      const cy = 0.5 * (intrinsics[9] + 1.0) * textureHeight

      const intr = { fx: fy, fy: fy, ox: cx, oy: cy }

      xrScene.videoWidth = cols
      xrScene.videoHeight = rows
      xrScene.pixelBuffer = pixels
      xrScene.cameraIntrinsics = intr
      xrScene.cameraPosition = position
      xrScene.cameraRotation = rotation
    },
  }
}
