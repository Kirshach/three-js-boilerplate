import * as THREE from 'three';

import { FOV, NEAR_CAMERA_FRUSTRUM, FAR_CAMERA_FRUSTRUM } from './const';

import type { Position } from '../types';

type Params = Position & { aspect: number };

export const createCamera = (
  window: Window,
  {
    x = 3,
    y = 1,
    z = 5,
    aspect = window.innerWidth / window.innerHeight
  }: Partial<Params> = {}
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    FOV,
    aspect,
    NEAR_CAMERA_FRUSTRUM,
    FAR_CAMERA_FRUSTRUM
  );
  camera.position.set(x, y, z);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  return camera;
};
