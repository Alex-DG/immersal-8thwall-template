import * as THREE from 'three'

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import Layout from './Layout'

class Model {
  setupMixer(glb) {
    if (!glb?.animations?.length) return

    this.mixer = new THREE.AnimationMixer(glb.scene)

    // Play action
    const action = this.mixer.clipAction(glb.animations[0])
    action.play()
  }

  async load() {
    Layout.toggleSpinner()

    try {
      const { scene } = XR8.Threejs.xrScene()
      const loader = new GLTFLoader()
      const glb = await loader.loadAsync(this.sources[0])
      glb.scene.visible = false
      glb.scene.traverse((child) => {
        if (child.name === 'Node') {
          child.visible = false
        }

        if (child.name === 'Text_Sofa') {
          this.sofaText = child
        }
      })

      scene.add(glb.scene)

      this.setupMixer(glb)

      this.model = glb.scene
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

    this.sources = [
      'models/LivingRoom/Living_room_remix.glb',
      'models/Desk/Desk_remix.glb',
    ]

    this.load()
  }

  update() {
    const delta = this.clock.getDelta()
    this.mixer?.update(delta)

    const time = this.clock.getElapsedTime()
    if (this.sofaText) {
      this.sofaText.rotation.z -= 0.01
      this.sofaText.position.y = Math.sin(time * 2) * 0.2 - 0.8
    }
  }
}

const instance = new Model()
export default instance
