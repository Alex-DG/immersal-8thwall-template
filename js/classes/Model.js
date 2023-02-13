import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Layout from './Layout'

class Model {
  async load() {
    Layout.toggleSpinner()

    try {
      const { scene } = XR8.Threejs.xrScene()
      const loader = new GLTFLoader()
      const glb = await loader.loadAsync(
        'models/LivingRoom/Living_room_remix.glb'
      )
      glb.scene.visible = false
      scene.add(glb.scene)

      // Setup animation
      this.model = glb.scene
      this.mixer = new THREE.AnimationMixer(glb.scene)

      // Play action
      const action = this.mixer.clipAction(glb.animations[0])
      action.play()
    } catch (error) {
      console.error({ error })
      alert('Error: model loading failed.')
    }

    Layout.toggleSpinner()
  }

  reveal(position, rotation, scale) {
    this.model.visible = true

    this.model.position.copy(position)
    this.model.quaternion.copy(rotation)
    this.model.scale.copy(scale)
  }

  init() {
    this.clock = new THREE.Clock()
    this.mixer = null

    this.load()
  }

  update() {
    const delta = this.clock.getDelta()
    this.mixer?.update(delta)
  }
}

const instance = new Model()
export default instance
