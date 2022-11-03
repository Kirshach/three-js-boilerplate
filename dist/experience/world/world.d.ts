import type { Object3D } from 'three';
import type { Scene } from '../scene';
export declare class World {
    private scene;
    private objects;
    constructor(scene: Scene);
    add(object: Object3D, name: string): void;
    remove(): void;
    handleFinishLoadingResources(): void;
}
