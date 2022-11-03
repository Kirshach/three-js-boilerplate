import type { Scene } from '../scene';
import type { ThreeWayObject } from '../../types';

export class World {
  private objects: Record<string, ThreeWayObject> = {};

  constructor(private scene: Scene) { }

  public add(object: ThreeWayObject, name: string) {
    if (this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    this.objects[name] = object;
    this.scene.add(object.element);
  }

  public remove() {
    /* Not implemented */
  }

  public handleFinishLoadingResources() {
    /* Not implemented */
  }
}
