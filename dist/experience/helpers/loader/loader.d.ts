import type { Font } from 'three/examples/jsm/loaders/FontLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Resource } from './types';
export declare class Loader {
    private manager;
    private loaders;
    constructor();
    load({ type, path }: Resource): Promise<THREE.Texture | THREE.CubeTexture | GLTF | Font>;
}
