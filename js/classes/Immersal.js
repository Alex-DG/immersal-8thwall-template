import * as THREE from 'three'

import Layout from './Layout'
import Model from './Model'

/**
 * Immersal API Documentation:
 * https://immersal.gitbook.io/sdk/api-documentation/rest-api#localize-image
 */
class Immersal {
  init() {
    this.bind()

    this.baseUrl = `https://api.immersal.com/`
    this.endpoint = 'localizeb64'

    this.localizingState = false

    this.responseCallback = {
      success: this.localizeSuccess,
      error: this.localizeError,
    }
  }

  bind() {
    this.localizeError = this.localizeError.bind(this)
    this.localizeSuccess = this.localizeSuccess.bind(this)
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  startLocalizing() {
    this.localizingState = true
    Layout.toggle()
  }

  endLocalizing() {
    this.localizingState = false
    Layout.toggle()
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async localizeError(response) {
    const json = await response.json()
    const error = json?.error || 'Something happened!'
    const message = `Status ${response.status}\n\nFailed to ${this.endpoint}: ${error}`

    alert(message)
  }

  async localizeSuccess(response) {
    const data = await response.json()

    if (data.success) {
      // The response is a projection matrix which can be used to extract
      // the position and orientation of the device

      // "px": 0.0, # camera X position
      // "py": 0.0, # camera Y position
      // "pz": 0.0, # camera Zposition
      // "r00": 1.0, # camera orientation as a 3x3 matrix
      // "r01": 0.0,
      // "r02": 0.0,
      // "r10": 0.0,
      // "r11": 1.0,
      // "r12": 0.0,
      // "r20": 0.0,
      // "r21": 0.0,
      // "r22": 1.0,

      // To make it work with our 3D scene we need to convert this data
      // to a 4x4 Matrix before using it with our 3D camera matrix world
      const cloudSpace = new THREE.Matrix4()
      cloudSpace.set(
        data.r00,
        -data.r01,
        -data.r02,
        data.px, // camera x position

        data.r10,
        -data.r11,
        -data.r12,
        data.py, // camera y position

        data.r20,
        -data.r21,
        -data.r22,
        data.pz, // camera z position

        0,
        0,
        0,
        1
      )

      const { camera } = XR8.Threejs.xrScene()

      const resultMatrix = new THREE.Matrix4().multiplyMatrices(
        camera.matrixWorld,
        cloudSpace.invert()
      )

      // Extract at once position, rotation, scale
      const position = new THREE.Vector3()
      const rotation = new THREE.Quaternion()
      const scale = new THREE.Vector3()

      resultMatrix.decompose(position, rotation, scale)

      Model.reveal(position, rotation, scale)
    } else {
      alert('Localization failed.\nPlease try again')
    }
  }

  //////////////////////////////////////////////////////////////////////////////////////////

  async localize() {
    if (this.localizingState) return

    this.startLocalizing()

    try {
      const b64 = await XR8.CanvasScreenshot.takeScreenshot()
      const token = import.meta.env.VITE_IMMERSAL_TOKEN
      const mapId = import.meta.env.VITE_MAP_ID_1
      const mapIds = [{ id: Number(mapId) }]

      const { principalPoint, focalLength } = XR8.Threejs.xrScene()

      const params = {
        b64,
        token,
        mapIds,
        ox: principalPoint.x,
        oy: principalPoint.y,
        fx: focalLength.x,
        fy: focalLength.y,
      }

      const url = `${this.baseUrl}${this.endpoint}`

      const response = await fetch(url, {
        mode: 'cors',
        method: 'POST',
        body: JSON.stringify(params),
      })

      const responseState = response.ok ? 'success' : 'error'
      this.responseCallback[responseState](response)
    } catch (error) {
      console.error('localize-error', error)
    }

    this.endLocalizing()
  }
}

const instance = new Immersal()
export default instance
