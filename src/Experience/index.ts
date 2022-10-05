import * as THREE from 'three';

import Resources from '../utils/Resources';
import Sizes, { SizesEvents, SizesEventPayload } from '../utils/Sizes';
import Time, { TimeEvents } from '../utils/Time';
import { sources } from '../utils/Resources';

import Camera from './Camera';
import Renderer from './Renderer';
import World from './World';

interface ExperienceParameters {
  canvas: HTMLCanvasElement;
  maxDPI: number;
}

let instance: Experience;

class Experience {
  parameters: ExperienceParameters;
  sizes: Sizes;
  scene: THREE.Scene;
  time: Time;
  camera: Camera;
  resources: Resources;
  renderer: Renderer;
  world: World;

  static initialize(parameters: ExperienceParameters) {
    instance = new Experience(parameters);
  }

  static get instance() {
    if (!instance) throw new Error('Experience not initialized');
    return instance;
  }

  private constructor(parameters: ExperienceParameters) {
    instance = this;

    this.parameters = parameters;

    this.sizes = new Sizes();
    this.sizes.subscribe(SizesEvents.RESIZE, this.handleResize);

    this.time = new Time();
    this.time.subscribe(TimeEvents.TICK, this.handleTick);

    this.resources = new Resources(sources);

    this.scene = new THREE.Scene();

    this.camera = new Camera();

    this.renderer = new Renderer();

    this.world = new World();
  }

  handleResize = (payload: SizesEventPayload) => {
    this.camera.handleResize(payload);
    this.renderer.handleResize(payload);
  }

  handleTick = () => {
    this.camera.update();
    this.renderer.render();
  }

  destroy() {
    this.time.destroy();
    this.sizes.destroy();
    this.scene.clear(); // anything else to clear up the scene?
    this.camera.destroy();
  }
}

export default Experience;
