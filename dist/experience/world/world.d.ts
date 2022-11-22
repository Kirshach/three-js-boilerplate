import type { Config } from '../config';
import type { EventEmitter } from '../event-emitter';
import type { Physics } from './physics';
import type { Scene } from '../scene';
import type { WorldObject } from './types';
export declare class World {
    private scene;
    private emitter;
    physics?: Physics;
    private nonPhysicalObjects;
    private physicalObjects;
    constructor(scene: Scene, emitter: EventEmitter);
    initialisePhysics(config: Config): Promise<void>;
    add(worldObject: WorldObject, name?: string): void;
    get objects(): {
        [x: string]: WorldObject;
    };
    update(): void;
    remove(): void;
}
