import * as THREE from 'three';

export interface Coordinates {
  x: number;
  y: number;
  z: number;
}

export interface EnvironmentMap {
  intensity: number,
  texture: THREE.Texture,
}
