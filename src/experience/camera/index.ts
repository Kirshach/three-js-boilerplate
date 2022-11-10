import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import type { Canvas } from '../canvas';
import type { Config } from '../config';
import type { Scene } from '../scene';
import type { Events } from '../helpers/event-emitter';

export class Camera {
  public element: THREE.PerspectiveCamera;
  private controls?: OrbitControls;

  public constructor(private scene: Scene, private canvas: Canvas, private config: Config) {
    // Camera itself
    this.element = new THREE.PerspectiveCamera(
      35,
      this.config.width / this.config.height,
      1,
      500
    );
    this.element.position.set(60, 40, 80);
    this.scene.add(this.element);
    // Camera controls
    if (config.cameraControls) {
      this.controls = new OrbitControls(this.element, this.canvas.element);
      this.controls.enableDamping = true;
    }
  }

  public handleResize({ width, height }: Events['experience/resize']) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }

  public update() {
    this.controls?.update();
  }

  public destroy() {
    // TODO: test this
    this.scene.remove(this.element);
    this.element.clear();
    this.element.removeFromParent();
    this.controls?.dispose();
  }
};
