import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

import type {Canvas} from '../canvas';
import type {Config} from '../config';
import type {Scene} from '../scene';
import type {Events} from '../event-emitter';

export class Camera {
  public element: THREE.PerspectiveCamera;
  private controls?: OrbitControls;

  public constructor(private scene: Scene, private canvas: Canvas, private config: Config) {
    // Camera itself
    this.element = new THREE.PerspectiveCamera(
      35,
      this.config.width / this.config.height,
      this.config.camera?.near ?? 1,
      this.config.camera?.far ?? 500
    );
    this.element.position.set(6, 4, 8);
    this.scene.add(this.element);

    // Camera controls
    if (config.camera?.controls === true || config.camera?.controls === undefined) {
      this.controls = new OrbitControls(this.element, this.canvas.element);
      this.controls.enableDamping = true;
    }
  }

  public handleResize({width, height}: Events['experience/resize']) {
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
}
