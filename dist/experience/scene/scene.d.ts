import * as THREE from 'three';
export declare class Scene {
    element: THREE.Scene;
    constructor();
    add(...objects: THREE.Object3D[]): void;
    remove(...objects: THREE.Object3D[]): void;
    clear(): void;
}
