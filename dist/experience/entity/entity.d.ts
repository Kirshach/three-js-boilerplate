import * as THREE from 'three';
import type * as CANNON from 'cannon-es';
import type { IEntity } from './types';
export declare class Entity implements IEntity {
    object3D: THREE.Object3D;
    body?: CANNON.Body | CANNON.Body[] | undefined;
    name: string;
    constructor(object3D: THREE.Object3D, body?: CANNON.Body | CANNON.Body[] | undefined, name?: string);
}
