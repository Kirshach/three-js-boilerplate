import * as THREE from 'three';

export const updateCameraOnWindowResize = (camera: THREE.PerspectiveCamera): void => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
