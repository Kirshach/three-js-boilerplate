import * as THREE from 'three';

import create from 'zustand/vanilla';

import { Store } from '../types';

import {
  getCanvasElement,
  updateRenderer,
  updateCamera,
  createRenderer,
  createCamera,
  createScene,
  createOrbitControls
} from './utils';

const canvasElement = getCanvasElement();

if (!canvasElement) throw new Error('No canvas found');

const camera = createCamera();
const orbitControls = createOrbitControls(camera, canvasElement);
const scene = createScene(camera, new THREE.AxesHelper(3));
const renderer = createRenderer(canvasElement, scene, camera);

const store = create<Store>((_set) => ({
  camera,
  orbitControls,
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
