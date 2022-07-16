import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export type Store = {
  camera: THREE.PerspectiveCamera,
  canvas: {
    element: HTMLCanvasElement | null,
    sizes: { width: number, height: number }
  };
  orbitControls: OrbitControls,
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  handleWindowResize(): void,
};
