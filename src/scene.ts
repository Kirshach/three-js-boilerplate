import * as THREE from "three";

import { camera } from './camera';

const scene = new THREE.Scene();
scene.add(camera);
scene.add(new THREE.AxesHelper(3));

export { scene };

