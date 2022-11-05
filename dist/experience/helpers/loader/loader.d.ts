import * as THREE from 'three';
import type { Font } from 'three/examples/jsm/loaders/FontLoader';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';
import type { Resource } from './types';
declare type LoadedResource<T extends Resource> = T['type'] extends 'texture' ? THREE.Texture : T['type'] extends 'cubeTexture' ? THREE.CubeTexture : T['type'] extends 'gltf' ? GLTF : T['type'] extends 'font' ? Font : never;
export declare class Loader {
    private manager;
    private loaders;
    constructor();
    load<T extends Resource>(resource: T): Promise<LoadedResource<T>>;
}
export declare const loader: Loader;
export {};
