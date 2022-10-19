import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import type { Resource, LoaderToResource, Source } from './types';
import { sources } from './sources';

import EventEmitter from '../event-emitter';
import { throwDevTimeError } from '../throwDevTimeError';

export enum LoaderEvents {
  FINISH_LOADING = 'FINISH_LOADING',
}

class Loader extends EventEmitter<null, LoaderEvents> {
  sources = sources;
  loaded: {
    [Name in typeof sources[number]['name']]?: LoaderToResource[typeof sources[number]['type']];
  };
  private loaders: {
    gltf: GLTFLoader;
    texture: THREE.TextureLoader;
    cubeTexture: THREE.CubeTextureLoader;
  };

  constructor() {
    super();
    this.loaded = {};

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco-loader/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    this.loaders = {
      gltf: gltfLoader,
      texture: new THREE.TextureLoader(),
      cubeTexture: new THREE.CubeTextureLoader(),
    };

    sources.forEach(source => this.load(source));
  }

  load(source: Source) {
    const paths = Array.isArray(source.path) ? source.path : [source.path];

    // TODO: Handle loading errors!
    switch (source.type) {
      case 'gltf':
        return paths.forEach(path =>
          this.loaders.gltf.load(path, file => this.handleLoaded(source, file))
        );

      case 'texture':
        return paths.forEach(path =>
          this.loaders.texture.load(path, file => this.handleLoaded(source, file))
        );

      case 'cubeTexture':
        if (typeof source.path === 'string') {
          throwDevTimeError(
            'Expected ".path" property of a "cubeTexture" object to be of type "string[]"'
          );
        }

        return this.loaders.cubeTexture.load(paths, file => this.handleLoaded(source, file));

      default:
        throwDevTimeError(
          `Unknown source type "${source.type}" provided for "${source.name}" asset`
        );
    }
  }

  handleLoaded = <T extends Resource>(source: Source, file: T) => {
    this.loaded[source.name] = file;
    if (Object.keys(this.loaded).length === this.sources.length) {
      this.emit(LoaderEvents.FINISH_LOADING, null);
    }
  };
}

export default Loader;
export { sources } from './sources';
export * from './types';
