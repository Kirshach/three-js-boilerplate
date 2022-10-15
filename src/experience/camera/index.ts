import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';

import type Canvas from '../canvas';
import type {ConfigEventPayload} from '../config';
import type Config from '../config';
import type Scene from '../scene';

class Camera {
  public element: THREE.PerspectiveCamera;
  private controls: OrbitControls;

  constructor(private scene: Scene, private canvas: Canvas, private config: Config) {
    // Camera itself
    this.element = new THREE.PerspectiveCamera(
      35,
      this.config.width / this.config.height,
      0.1,
      100
    );
    this.element.position.set(6, 4, 8);
    this.scene.add(this.element);
    // Camera controls
    this.controls = new OrbitControls(this.element, this.canvas.element);
    this.controls.enableDamping = true;
  }

  handleResize({width, height}: ConfigEventPayload) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }

  update() {
    // This makes damping work properly
    this.controls.update();
  }

  destroy() {
    this.scene.remove(this.element);
    this.element.clear();
    this.element.removeFromParent();
    this.controls.dispose();
  }
}

export default Camera;
