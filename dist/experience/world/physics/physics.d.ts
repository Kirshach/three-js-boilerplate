import type * as THREE from 'three';
import { World } from 'cannon-es';
import type { Body } from 'cannon-es';
import type CannonDebugger from 'cannon-es-debugger';
import type { IPhysics } from './types';
import type { PhysicsConfig } from '../../config';
export declare class Physics implements IPhysics {
    world: World;
    debugger?: typeof CannonDebugger;
    constructor(physicsConfig: PhysicsConfig);
    initialiseDebug(scene: THREE.Scene): Promise<void>;
    add(body: Body): void;
    update(): void;
}
