import * as THREE from 'three';

import Environment from './Environment';
import Resources, { ResourcesEvents } from '../../utils/Resources';

import Experience from '../';

class World {
  environment: Environment | null;
  resources: Resources;

  constructor() {
    this.environment = null;

    const testMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshStandardMaterial(),
    );
    Experience.instance.scene.add(testMesh);

    this.resources = Experience.instance.resources;
    this.resources.subscribe(
      (ResourcesEvents.FINISH_LOADING),
      () => this.handleFinishLoadingResources()
    );
  }

  handleFinishLoadingResources() {
    this.environment = new Environment();
  }
}

export default World;
