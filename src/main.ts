import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { createCamera, updateCameraOnWindowResize } from './camera';
import { getCanvasElement } from './canvas'
import { addWindowResizeListener } from './canvas'

const camera = createCamera(window);
const canvas = getCanvasElement();
const scene = new THREE.Scene();
scene.add(camera, new THREE.AxesHelper(3));

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.render(scene, camera);

const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;

window.addEventListener("resize", () => {
  updateCameraOnWindowResize(camera);
  // resizes renderer and changes canvas size
  renderer.setSize(window.innerWidth, window.innerHeight);
  // update pixel ratio in case browser window moved to a different screen
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

addWindowResizeListener(canvas);

const tick = () => {
  renderer.render(scene, camera);
  orbitControls.update();
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
