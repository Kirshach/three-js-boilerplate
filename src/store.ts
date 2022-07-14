import THREE from 'three';

import CameraControls from "camera-controls";
import create from 'zustand/vanilla';

import { Store } from './types';

// get canvas
const canvasElement = <HTMLCanvasElement>document.getElementById("my-scene");
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

CameraControls.install({ THREE });
const cameraControls = new CameraControls(camera, canvasElement);

const store = create<Store>((_set) => ({
  canvas: {
    element: canvasElement,
    get sizes() {
      return { width: this.element?.clientWidth, height: this.element?.clientHeight }
    }
  },
  camera,
  cameraControls,
}))

export default store;