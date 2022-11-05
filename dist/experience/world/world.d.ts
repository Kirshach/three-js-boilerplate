import * as THREE from 'three';
import type { Scene } from '../scene';
export declare class World {
    private scene;
    private objects;
    constructor(scene: Scene);
    add(object: THREE.Object3D, name?: string): void;
    remove(): void;
    handleFinishLoadingResources(): void;
}
