import type * as THREE from 'three';

import type {GLTF} from 'three/examples/jsm/loaders/GLTFLoader';
import type {Sources} from './sources';

export type Loader = 'gltf' | 'texture' | 'cubeTexture';

export type Resource = THREE.Texture | THREE.CubeTexture | GLTF;
export type LoaderToResource = {
  gltf: GLTF;
  texture: THREE.Texture;
  cubeTexture: THREE.CubeTexture;
};

export type Source = Readonly<{
  name: Sources[number]['name'];
  type: Loader;
  path: ReadonlyArray<string> | string;
}>;
