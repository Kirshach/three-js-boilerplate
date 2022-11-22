import * as THREE from 'three';
import type {FontLoader, Font} from 'three/examples/jsm/loaders/FontLoader';
import type {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';

import {throwDevTimeError} from '../../utils';
import type {Resource} from './types';

type LoadedResource<T extends Resource> = T['type'] extends 'texture'
  ? THREE.Texture
  : T['type'] extends 'cubeTexture'
  ? THREE.CubeTexture
  : T['type'] extends 'gltf'
  ? GLTF
  : T['type'] extends 'font'
  ? Font
  : never;

export class Loader {
  // TODO: instantiate the manager in the constructor and make use of it
  private static manager?: THREE.LoadingManager;
  private static loaders: {
    gltf?: GLTFLoader;
    texture?: THREE.TextureLoader;
    cubeTexture?: THREE.CubeTextureLoader;
    font?: FontLoader;
  } = {};

  // TODO: would be neat to improve typings here
  public static load<T extends Resource>(resource: T): Promise<LoadedResource<T>> {
    THREE.Cache.enabled = true;
    if (resource.type === 'gltf') {
      return new Promise<LoadedResource<T>>(async (resolve, reject) => {
        (this.loaders.gltf ??= await (async () => {
          // TODO: preload when GLTF is 100% going to be used (probably add some config options)
          const glTFLoader = new (await import('three/examples/jsm/loaders/GLTFLoader')).GLTFLoader(
            this.manager
          );
          const dracoLoader = new (
            await import('three/examples/jsm/loaders/DRACOLoader')
          ).DRACOLoader(this.manager);
          // TODO: test whether all of the files in the "/draco/" folder are necessary
          // TODO: think of an approach to make this not be bundled unnecessarily when draco isn't used
          // TODO: test what happens if the decoder is not present
          dracoLoader.setDecoderPath('../../assets/draco');
          glTFLoader.setDRACOLoader(dracoLoader);
          return glTFLoader;
        })()).load(
          resource.path,
          (resource: GLTF) => resolve(resource as LoadedResource<T>),
          undefined, // progress event currently not supported by Three.js
          (error: ErrorEvent) => reject(error)
        );
      });
    }

    if (resource.type === 'texture') {
      return new Promise<LoadedResource<T>>(async (resolve, reject) => {
        // TODO: preload when Textures are 100% going to be used (probably add some config options)
        (this.loaders.texture ??= new THREE.TextureLoader()).load(
          resource.path,
          (resource: THREE.Texture) => {
            resource.encoding = THREE.sRGBEncoding;
            resolve(resource as LoadedResource<T>);
          },
          undefined, // progress event currently not supported by Three.js
          error => reject(error)
        );
      });
    }

    if (resource.type === 'cubeTexture') {
      return new Promise<LoadedResource<T>>((resolve, reject) => {
        // TODO: preload when CubeTextures are 100% going to be used (probably add some config options)
        (this.loaders.cubeTexture ??= new THREE.CubeTextureLoader()).load(
          resource.path,
          (resource: THREE.CubeTexture) => {
            resource.encoding = THREE.sRGBEncoding;
            resolve(resource as LoadedResource<T>);
          },
          undefined, // progress event currently not supported by Three.js
          error => reject(error)
        );
      });
    }

    if (resource.type === 'font') {
      return new Promise<LoadedResource<T>>(async (resolve, reject) => {
        (this.loaders.font ??=
          new // TODO: preload when Fonts are 100% going to be used (probably add some config options)
          (await import('three/examples/jsm/loaders/FontLoader')).FontLoader()).load(
          resource.path,
          (resource: Font) => resolve(resource as LoadedResource<T>),
          undefined,
          error => reject(error)
        );
      });
    }

    return throwDevTimeError(
      // @ts-expect-error impossible condition
      `Unknown resource type "${resource.type} " provided for file "${resource.path} "`
    ) as never;
  }
}
