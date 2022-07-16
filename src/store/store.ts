import * as THREE from 'three';

import create from 'zustand/vanilla';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import { Store } from '../types';

import {
  getCanvasElement,
  updateRenderer,
  updateCamera,
  createRenderer,
  createCamera,
  createScene
} from './utils';

const canvasElement = getCanvasElement();
const camera = createCamera();
const scene = createScene(camera, new THREE.AxesHelper(3));

if (!canvasElement) throw new Error('No canvas found');

const renderer = createRenderer(canvasElement, scene, camera);
const orbitControls = new OrbitControls(camera, canvasElement);

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
