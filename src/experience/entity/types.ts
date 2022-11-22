import type * as CANNON from 'cannon-es';
import type {Entity} from './entity';

export interface IEntity {
  object3D: THREE.Object3D;
  body?: CANNON.Body;
  name: string;
}

export interface PhysicalEntity extends Entity {
  body: CANNON.Body;
}
