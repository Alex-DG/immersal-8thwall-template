import * as THREE from 'three'

export const initThreeScenePipelineModule = () => {
  const init = ({ canvas, canvasWidth, canvasHeight, GLctx }) => {
    // Scene
    const scene = new THREE.Scene()

    // Camera
    const aspect = canvasWidth / canvasHeight
    const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)

    // Set the initial camera position relative to the scene we just laid out. This must be at a
    // height greater than y=0.
    camera.position.set(0, 3, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      context: GLctx,
      antialias: true,
    })
    renderer.autoClear = false
    renderer.physicallyCorrectLights = true
    renderer.outputEncoding = THREE.sRGBEncoding
    renderer.toneMapping = THREE.CineonToneMapping
    renderer.toneMappingExposure = 1.72
    renderer.setSize(canvasWidth, canvasHeight)

    // XR Scene Data
    const xrSceneData = { scene, camera, renderer }
    window.XR8.Threejs.xrScene = () => xrSceneData

    // Prevent scroll/pinch
    canvas.addEventListener('touchmove', (event) => {
      event.preventDefault()
    })

    // Sync the xr controller's 6DoF position and camera paremeters with our scene.
    XR8.XrController.updateCameraProjectionMatrix({
      origin: camera.position,
      facing: camera.quaternion,
    })
  }

  return {
    name: 'threejs-scene',

    // onStart is called once when the camera feed begins. In this case, we need to wait for the
    onStart: (args) => init(args),

    onUpdate: ({ processCpuResult }) => {
      const realitySource =
        processCpuResult.reality || processCpuResult.facecontroller

      if (!realitySource) return

      const { camera } = XR8.Threejs.xrScene()

      const { rotation, position, intrinsics } = realitySource

      for (let i = 0; i < 16; i++) {
        camera.projectionMatrix.elements[i] = intrinsics[i]
      }

      // Fix for broken raycasting in r103 and higher. Related to:
      //   https://github.com/mrdoob/three.js/pull/15996
      // Note: camera.projectionMatrixInverse wasn't introduced until r96 so check before setting
      // the inverse
      if (camera.projectionMatrixInverse) {
        if (camera.projectionMatrixInverse.invert) {
          // THREE 123 preferred version
          camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert()
        } else {
          // Backwards compatible version
          camera.projectionMatrixInverse.getInverse(camera.projectionMatrix)
        }
      }

      if (rotation) camera.setRotationFromQuaternion(rotation)

      if (position) camera.position.set(position.x, position.y, position.z)
    },

    onCanvasSizeChange: ({ canvasWidth, canvasHeight }) => {
      const { renderer } = XR8.Threejs.xrScene()
      renderer?.setSize(canvasWidth, canvasHeight)
    },

    onRender: () => {
      const { renderer, scene, camera } = XR8.Threejs.xrScene()
      renderer.clearDepth()
      renderer.render(scene, camera)
    },
  }
}
