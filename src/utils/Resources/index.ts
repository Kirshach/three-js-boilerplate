import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import type { Resource, LoaderToResource, Source } from './types';
import { sources } from './sources';
import type { Sources } from './sources';

import EventEmitter from '../EventEmitter';
import { throwDevTimeError } from '../throwDevTimeError';

export enum ResourcesEvents {
  FINISH_LOADING = 'FINISH_LOADING',
}

class Resources extends EventEmitter<null, ResourcesEvents> {
  loaded: {
    [Name in typeof sources[number]['name']]?: LoaderToResource[typeof sources[number]['type']];
  }
  private loaders: {
    gltf: GLTFLoader,
    texture: THREE.TextureLoader,
    cubeTexture: THREE.CubeTextureLoader,
  }

  constructor(private sources: Sources) {
    super();
    this.loaded = {};
    this.loaders = {
      gltf: new GLTFLoader(),
      texture: new THREE.TextureLoader,
      cubeTexture: new THREE.CubeTextureLoader,
    }

    sources.forEach((source => this.load(source)));
  }

  load(source: Source) {
    const paths = Array.isArray(source.path) ? source.path : [source.path];

    // TODO: Handle loading errors!
    switch (source.type) {
      case 'gltf':
        return paths.forEach(path => this.loaders.gltf.load(
          path,
          (file) => this.handleLoaded(source, file)
        ));

      case 'texture':
        return paths.forEach(path => this.loaders.texture.load(
          path,
          (file) => this.handleLoaded(source, file)
        ));

      case 'cubeTexture':
        if (typeof source.path === 'string') {
          throwDevTimeError(`Expected '.path' property of a 'cubeTexture' object to be of type 'string[]'`);
        }

        return this.loaders.cubeTexture.load(
          paths,
          (file) => this.handleLoaded(source, file)
        );
    }
  }

  handleLoaded<T extends Resource>(source: Source, file: T) {
    this.loaded[source.name] = file;
    if (Object.keys(this.loaded).length === this.sources.length) {
      this.emit(ResourcesEvents.FINISH_LOADING, null)
    }
  }
}

export default Resources;
export { sources } from './sources';
export * from './types';
