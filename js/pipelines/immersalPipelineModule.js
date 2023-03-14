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

      /**

        < Intrinsics: 3x3 Matrix >
           |-> describes the internal parameters of a camera and where is the camera in the 3D world

        | fx    s   cx |
        | 0    fy   cy |
        | 0    0    1  |
    
        * s is the skew
        * fx and fy are the horizontal and vertical focal lengths
        * cx and cy are the coordinates of the principal point

      */

      const { intrinsics } = processCpuResult.reality
      const { viewport } = processCpuResult.immersal

      /**
       * Principal point in pixels: Pixel of  your image through which the opatical axes of your camera passes,
       * somewhere near the center of the image (2D image plane)
       */

      const ox = viewport.width * 0.5 * (1 - intrinsics[3]) + viewport.offsetX
      const oy = viewport.height * 0.5 * (1 - intrinsics[6]) + viewport.offsetY

      const principalPoint = {
        x: ox,
        y: oy,
      }

      /**
       * Focal lengths in pixels: distance between the projection center of your lens and the image sensor,
       * tells us the angle of view, how much of the scene will be captured
       *
       * note: fx and fy are very equivalent one could be substitute by the other
       */

      // const fx = viewport.width * 0.5 * intrinsics[0]
      const fy = viewport.height * 0.5 * intrinsics[5]

      const focalLength = {
        x: fy,
        y: fy,
      }

      const xrScene = XR8.Threejs.xrScene()
      xrScene.principalPoint = principalPoint
      xrScene.focalLength = focalLength
    },
  }
}
