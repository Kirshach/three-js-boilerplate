import type * as THREE from 'three';
import {World, Vec3} from 'cannon-es';
import type {Body} from 'cannon-es';
import type CannonDebugger from 'cannon-es-debugger';

import type {IPhysics} from './types';
import type {PhysicsConfig} from '../../config';

export class Physics implements IPhysics {
  public world: World;
  public debugger?: typeof CannonDebugger;

  constructor(physicsConfig: PhysicsConfig) {
    const {gravity, debug} = physicsConfig;

    this.world = new World({
      gravity: new Vec3(0, gravity, 0),
    });
  }

  public async initialiseDebug(scene: THREE.Scene) {
    // TODO: make sure this doesn't get included into the bundle
    if (process.env.NODE_ENV === 'development') {
      this.debugger = new (await import('cannon-es-debugger')).default(scene, this.world, {});
    }
  }

  public add(body: Body) {
    this.world.addBody(body);
  }

  public update() {
    if (process.env.NODE_ENV === 'development') {
      this.debugger?.update();
    }
  }
}
