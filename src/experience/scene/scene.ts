import * as THREE from 'three';

export class Scene {
  public element: THREE.Scene;

  constructor() {
    this.element = new THREE.Scene();
  }

  public add(...objects: THREE.Object3D[]) {
    this.element.add(...objects);
  }

  public remove(...objects: THREE.Object3D[]) {
    this.element.remove(...objects);
  }

  public clear() {
    this.element.clear();
  }
};
