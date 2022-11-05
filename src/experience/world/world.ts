import * as THREE from 'three';
import type { Scene } from '../scene';

export class World {
  private objects: Record<string, THREE.Object3D> = {};

  constructor(private scene: Scene) { }

  public add(object: THREE.Object3D, name?: string) {
    if (name && this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    if (!!name) { this.objects[name] = object; }
    this.scene.add(object);
  }

  public remove() {
    /* Not implemented */
  }

  public handleFinishLoadingResources() {
    /* Not implemented */
  }
}
