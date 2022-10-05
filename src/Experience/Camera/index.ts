import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { SizesEventPayload } from '../../utils/Sizes';

import Experience from '../';

class Camera {
  threeJsCamera: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  constructor() {
    const { sizes: { height, width }, parameters: { canvas } } = Experience.instance;
    // Camera itself
    this.threeJsCamera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    this.threeJsCamera.position.set(6, 4, 8);
    Experience.instance.scene.add(this.threeJsCamera);
    // Camera controls
    this.controls = new OrbitControls(this.threeJsCamera, canvas);
    this.controls.enableDamping = true;
  }

  handleResize({ width, height }: SizesEventPayload) {
    this.threeJsCamera.aspect = width / height;
    this.threeJsCamera.updateProjectionMatrix();
  }

  update() {
    // This makes damping work properly
    this.controls.update();
  }

  destroy() {
    Experience.instance.scene.remove(this.threeJsCamera);
    this.threeJsCamera.clear();
    this.threeJsCamera.removeFromParent();
    this.controls.dispose();
  }
}

export default Camera;
