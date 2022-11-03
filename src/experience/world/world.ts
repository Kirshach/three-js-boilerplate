import type { Object3D } from 'three';
import type { Scene } from '../scene';

export class World {
  private objects: Record<string, Object3D> = {};

  constructor(private scene: Scene) { }

  public add(object: Object3D, name: string) {
    if (this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    this.objects[name] = object;
    this.scene.add(object);
  }

  public remove() {
    /* Not implemented */
  }

  public handleFinishLoadingResources() {
    /* Not implemented */
  }
}
