import * as THREE from 'three';

import type Scene from '../scene';
import type Loader from '../../utils/resources';
import {LoaderEvents} from '../../utils/resources';

class World {
  private objects: Record<string, THREE.Object3D> = {};

  constructor(private scene: Scene, private resources: Loader) {
    this.addTestMesh();
  }

  private addTestMesh() {
    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial()
    );

    this.scene.add(testMesh);
    this.resources.subscribe(
      LoaderEvents.FINISH_LOADING,
      () => null // this.handleFinishLoadingResources()
    );
  }

  add(object: THREE.Object3D, name: string) {
    if (this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    this.objects[name] = object;
    this.scene.add(object);
  }

  remove() {
    throw new Error('Method not implemented');
  }

  handleFinishLoadingResources() {
    throw new Error('Not implemented');
  }
}

export default World;