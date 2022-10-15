import * as THREE from 'three';

import type Scene from '../scene';
import type Loader from '../../utils/resources';
import {nonNullDevTimeCheck, throwDevTimeError} from '../../utils';

import type {EnvironmentMap} from '../../types';

class Environment {
  private lights: Record<string, THREE.Light> = {};
  private environmentMap: EnvironmentMap;

  public constructor(private resources: Loader, private scene: Scene) {}

  public initialize = () => {
    // Set environment map
    const texture = nonNullDevTimeCheck(
      this.resources.loaded.environmentMapTexture,
      'Environment texture is missing while trying to create and environment map'
    );
    texture.encoding = THREE.sRGBEncoding;
    this.environmentMap = {
      intensity: 0.4,
      texture,
    };

    // Add sunlight
    this.addLight('sun', () => {
      const sunlight = new THREE.DirectionalLight(0xffffff, 4);
      sunlight.castShadow = true;
      sunlight.shadow.camera.far = 15;
      sunlight.shadow.mapSize.set(1024, 1024);
      sunlight.shadow.normalBias = 0.05;
      sunlight.position.set(3, 3, -2.25);
      return sunlight;
    });
  };

  public addLight = (name: string, lightFactory: () => THREE.Light) => {
    const light = lightFactory();

    if (this.lights[name]) throwDevTimeError(`Light with name ${name} already exists`);

    this.lights[name] = light;
    this.scene.add(light);
  };

  public removeLight = () => {
    throw new Error('Method not implemented');
  };

  public setEnvironmentMap = (
    environmentFactory: () => {intensity: number; texture: THREE.CubeTexture}
  ) => {
    this.environmentMap = environmentFactory();
  };
}

export default Environment;
