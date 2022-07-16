import * as THREE from 'three';

import CameraControls from 'camera-controls';
import create from 'zustand/vanilla';

import { Store } from './types';

// get canvas
const canvasElement = <HTMLCanvasElement>document.getElementById('my-scene');
const initialCanvasSizes = {
  width: canvasElement.clientWidth, height: canvasElement.clientHeight
};

// initialize camera
const camera = new THREE.PerspectiveCamera(
  60,
  initialCanvasSizes.width / initialCanvasSizes.height,
  0.1,
  100
);
camera.position.set(1, 1, 5);
const updateCamera = (camera: THREE.PerspectiveCamera) => {
  // update aspect ratio  
  camera.aspect = window.innerWidth / window.innerHeight;
  // notify Three.js about camera aspect change
  camera.updateProjectionMatrix();
};
updateCamera(camera);

// initialize scene
const scene = new THREE.Scene();
scene.add(camera);
scene.add(new THREE.AxesHelper(3));

// renderer
const renderer = new THREE.WebGLRenderer({ canvas: canvasElement });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const updateRenderer = (renderer: THREE.WebGLRenderer) => {
  // resize renderer and the canvas size
  renderer.setSize(window.innerWidth, window.innerHeight);
  // just in case browser window got moved to i.e. an external monitor
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
};
updateRenderer(renderer);

CameraControls.install({ THREE });
const cameraControls = new CameraControls(camera, canvasElement);

const store = create<Store>((_set) => ({
  camera,
  cameraControls,
  canvas: {
    element: canvasElement,
    get sizes() {
      return { width: this.element?.clientWidth, height: this.element?.clientHeight }
    },
  },
  renderer,
  scene,
  handleWindowResize() {
    const { camera, renderer, } = store.getState();
    updateCamera(camera);
    updateRenderer(renderer);
  },
}))

export default store;