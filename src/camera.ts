import * as THREE from "three";
import CameraControls from "camera-controls";

import { canvas, canvasSizes } from './renderer'

CameraControls.install({ THREE });

const camera = new THREE.PerspectiveCamera(
  60,                                     // vertical FOV
  canvasSizes.width / canvasSizes.height, // aspect ratio
  0.1,                                    // near-distance cutoff
  100                                     // far-distance cutoff
);
camera.position.set(1, 1, 5);
const cameraControls = new CameraControls(camera, canvas);

export { camera, cameraControls };