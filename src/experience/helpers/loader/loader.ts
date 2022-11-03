import { Cache, LoadingManager, TextureLoader, CubeTextureLoader } from 'three';
import type { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader'
import type { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { throwDevTimeError } from '../../../utils';
import type { Resource } from './types';

export class Loader {
  // TODO: make use of the manager
  private manager = new LoadingManager(/* ? */);
  private loaders: {
    gltf?: GLTFLoader;
    texture?: THREE.TextureLoader;
    cubeTexture?: THREE.CubeTextureLoader;
    font?: FontLoader;
  } = {};

  constructor() {
    Cache.enabled = true;
  }

  public load({ type, path }: Resource): Promise<THREE.Texture | THREE.CubeTexture | GLTF | Font> {
    switch (type) {
      case 'gltf':
        return new Promise<GLTF>(async (resolve, reject) => {
          (this.loaders.gltf ??= await (
            async () => {
              const glTFLoader =
                new (await (import('three/examples/jsm/loaders/GLTFLoader'))).GLTFLoader(this.manager);
              const dracoLoader =
                new (await (import('three/examples/jsm/loaders/DRACOLoader'))).DRACOLoader(this.manager);
              // TODO: test what happens if the decoder is not present 
              dracoLoader.setDecoderPath('/draco/');
              glTFLoader.setDRACOLoader(dracoLoader);
              return glTFLoader;
            })()
          ).load(
            path,
            (resource: GLTF) => resolve(resource),
            undefined, // progress event currently not supported by Three.js
            (error: ErrorEvent) => reject(error)
          );
        });
      case 'texture':
        return new Promise<THREE.Texture>(async (resolve, reject) => {
          (this.loaders.texture ??= new TextureLoader()).load(
            path,
            (resource: THREE.Texture) => resolve(resource),
            undefined, // progress event currently not supported by Three.js
            (error) => reject(error))
        });
      case 'cubeTexture':
        return new Promise<THREE.CubeTexture>((resolve, reject) => {
          (this.loaders.cubeTexture ??= new CubeTextureLoader()).load(
            path,
            (resource: THREE.CubeTexture) => resolve(resource),
            undefined, // progress event currently not supported by Three.js
            (error) => reject(error))
        });
      case 'font':
        return new Promise<Font>(async (resolve, reject) => {
          (this.loaders.font ??= new (await (import('three/examples/jsm/loaders/FontLoader'))).FontLoader)
            .load(
              path,
              (resource: Font) => resolve(resource),
              undefined,
              (error) => reject(error)
            );
        });
      default:
        return throwDevTimeError(`Unknown resource type "${type} " provided for file "${path} "`) as never;
    }
  };
}
