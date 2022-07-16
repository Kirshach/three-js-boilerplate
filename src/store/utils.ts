import * as THREE from 'three';

import {
  FOV,
  NEAR_CAMERA_FRUSTRUM,
  FAR_CAMERA_FRUSTRUM
} from '../const';

export const createRenderer = (
  canvasElement: HTMLCanvasElement,
  scene: THREE.Scene,
  camera: THREE.PerspectiveCamera
): THREE.WebGLRenderer => {
  const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
  updateRenderer(renderer);
  renderer.render(scene, camera);
  return renderer;
};

export const updateRenderer = (renderer: THREE.WebGLRenderer): void => {
  // resize renderer and the canvas size
  renderer.setSize(window.innerWidth, window.innerHeight);
  // in case the browser window gets moved to a different screen
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};

export const getCanvasElement = (): HTMLCanvasElement | null =>
  <HTMLCanvasElement>document.getElementById('my-scene');

export const createCamera = (): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    FOV,
    window.innerWidth / window.innerHeight,
    NEAR_CAMERA_FRUSTRUM,
    FAR_CAMERA_FRUSTRUM
  );
  camera.position.set(1, 1, 5);
  updateCamera(camera);
  return camera;
};

export const createScene = (...args: THREE.Object3D[]): THREE.Scene => {
  const scene = new THREE.Scene();
  for (const object3D of args) {
    scene.add(object3D);
  }
  return scene;
};

export const updateCamera = (camera: THREE.PerspectiveCamera): void => {
  // update aspect ratio  
  camera.aspect = window.innerWidth / window.innerHeight;
  // notify Three.js about camera aspect change
  camera.updateProjectionMatrix();
};

