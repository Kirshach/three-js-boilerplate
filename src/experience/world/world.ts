import * as THREE from 'three';
import {nanoid} from 'nanoid';

import {Entity, PhysicalEntity} from '../entity';
import type {Config} from '../config';
import type {EventEmitter} from '../event-emitter';
import type {Physics} from './physics';
import type {Scene} from '../scene';
import type {WorldObject} from './types';

export class World {
  public physics?: Physics;
  private nonPhysicalObjects: Record<string, WorldObject> = {};
  private physicalObjects: Record<string, PhysicalEntity> = {};

  constructor(private scene: Scene, private emitter: EventEmitter) {}

  public async initialisePhysics(config: Config) {
    this.physics = new (await import('./physics')).Physics(config.physics);
    // TODO: make sure it's not present in the bundle
    if (process.env.NODE_ENV === 'development' && config.physics.debug) {
      await this.physics.initialiseDebug(this.scene.element);
    }
    this.emitter.emit('world/physics_initialized');
  }

  public add(worldObject: WorldObject, name: string = worldObject.name || nanoid()) {
    const objectsCategory =
      worldObject instanceof Entity && worldObject.body ? 'nonPhysicalObjects' : 'physicalObjects';

    if (this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    this[objectsCategory][name] = worldObject;

    if (worldObject instanceof Entity) {
      this.scene.add(worldObject.object3D);
      if (worldObject.body) {
        // TODO: make sure it's not present in the bundle
        if (process.env.NODE_ENV === 'development' && !this.physics) {
          throw new Error(
            "You attempted adding physics body, but the physics engine hasn't been initialized yet"
          );
        }

        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: make the API such that if you move a mesh, it's body moves too
        // TODO: fix typing issue
        this.physics.add(worldObject.body);
      }
    } else {
      this.scene.add(worldObject);
    }
  }

  public get objects() {
    return {...this.nonPhysicalObjects, ...this.nonPhysicalObjects};
  }

  public update() {
    if (!this.physics) {
      return;
    }

    for (const objectName in this.physicalObjects) {
      const {object3D, body} = this.physicalObjects[objectName];
    }

    this.physics.update();
  }

  public remove() {
    throw new Error('Not Implemented');
  }
}
