import * as THREE from 'three'

class _Box {
  setInstance() {
    const { scene } = XR8.Threejs.xrScene()

    const boxMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2, 2, 2),
      new THREE.MeshNormalMaterial()
    )
    boxMesh.rotateY(Math.PI / 6)
    boxMesh.position.z = -4

    scene.add(boxMesh)

    this.instance = boxMesh
  }

  init() {
    this.setInstance()
  }

  update() {}
}

const Box = new _Box()
export default Box
