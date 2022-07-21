import * as THREE from 'three';

import {
  getCanvasElement,
  updateRenderer,
  updateCamera,
  createRenderer,
  createCamera,
  createScene,
  createOrbitControls
} from './utils';

const canvas = getCanvasElement();

if (!canvas) throw new Error('No canvas found');

const camera = createCamera();
const orbitControls = createOrbitControls(camera, canvas);
const scene = createScene(camera, new THREE.AxesHelper(3));
const renderer = createRenderer(canvas, scene, camera);

const canvasSizes = { width: canvas.clientWidth, height: canvas.clientHeight }

window.addEventListener("resize", () => {
  updateCamera(camera);
  updateRenderer(renderer);
});

export {
  scene,
  renderer,
  camera,
  orbitControls,
  canvas,
  canvasSizes,
};
