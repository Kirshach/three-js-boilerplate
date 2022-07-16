import * as THREE from 'three';
import CameraControls from 'camera-controls';

export type Store = {
  camera: THREE.PerspectiveCamera,
  cameraControls: CameraControls,
  canvas: {
    element: HTMLCanvasElement | null,
    sizes: { width: number, height: number }
  };
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  handleWindowResize(): void,
};
