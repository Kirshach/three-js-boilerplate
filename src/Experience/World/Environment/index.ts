import * as THREE from 'three';

import { throwDevTimeError } from '../../../utils/throwDevTimeError';

import Experience from '../../';

interface EnvironmentMap {
  intensity: number,
  texture: THREE.Texture,
}

class Environment {
  sunlight: THREE.DirectionalLight | null;
  environmentMap: EnvironmentMap | null;

  constructor() {
    this.sunlight = null;
    this.environmentMap = null;

    this.addEnvironmentMap();
    this.addSunlight();
  }

  addSunlight() {
    const { scene } = Experience.instance;

    this.sunlight = new THREE.DirectionalLight(0xFFFFFF, 4);
    this.sunlight.castShadow = true;
    this.sunlight.shadow.camera.far = 15;
    this.sunlight.shadow.mapSize.set(1024, 1024);
    this.sunlight.shadow.normalBias = 0.05;
    this.sunlight.position.set(3, 3, - 2.25);
    scene.add(this.sunlight);
  }

  addEnvironmentMap() {
    const texture = Experience.instance.resources.loaded.environmentMapTexture;
    if (!texture) throwDevTimeError('Environment texture is missing while trying to create and environment map');
    texture.encoding = THREE.sRGBEncoding;

    this.environmentMap = {
      intensity: 0.4,
      texture,
    } as EnvironmentMap;
  }
}

export default Environment;
