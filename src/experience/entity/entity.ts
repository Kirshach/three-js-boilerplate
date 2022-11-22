import * as THREE from 'three';
import {nanoid} from 'nanoid';
import type * as CANNON from 'cannon-es';
import type {IEntity} from './types';

export class Entity implements IEntity {
  constructor(
    public object3D: THREE.Object3D,
    public body?: CANNON.Body | CANNON.Body[],
    public name: string = nanoid()
  ) {}
}
