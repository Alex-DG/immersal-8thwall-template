import * as THREE from 'three'

class Lights {
  setDirectionalLight() {
    const directionalLight = new THREE.DirectionalLight('#ffffff', 5)
    directionalLight.position.set(4, 3, 1)

    const directionalLight2 = new THREE.DirectionalLight('#ffffff', 1.25)
    directionalLight2.position.set(0, 0, 2)

    const { scene } = XR8.Threejs.xrScene()
    scene.add(directionalLight)
    scene.add(directionalLight2)
  }

  setAmbientLight() {
    const ambientLight = new THREE.AmbientLight('#ffffff', 0.4)

    const { scene } = XR8.Threejs.xrScene()
    scene.add(ambientLight)
  }

  init() {
    this.setDirectionalLight()
    this.setAmbientLight()
  }
}

const instance = new Lights()
export default instance
