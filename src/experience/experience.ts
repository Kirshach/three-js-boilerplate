import * as THREE from 'three';
import mitt from 'mitt';

import {Config, type ConfigParameters} from './config';
import {Time} from './time';
import {Camera} from './camera';
import {Canvas} from './canvas';
import {Renderer} from './renderer';
import {World} from './world';
import {Scene} from './scene';

import type {EventEmitter, Events} from './event-emitter';
import {PhysicsConfig} from './config';

export class Experience {
  private emitter: EventEmitter;
  private scene: Scene;
  private time: Time;
  public config: Config;
  public world: World;
  public canvas: Canvas;
  public camera: Camera;
  public renderer: Renderer;

  public constructor(initialConfig: ConfigParameters) {
    this.emitter = mitt<Events>();
    this.config = new Config(this.emitter, initialConfig);
    this.canvas = new Canvas(this.config);
    this.scene = new Scene();
    this.time = new Time(this.emitter);

    this.camera = new Camera(this.scene, this.canvas, this.config);
    this.renderer = new Renderer(this.config, this.scene, this.camera);
    this.world = new World(this.scene, this.emitter);
    if (initialConfig.axesHelperLength) {
      this.world.add(new THREE.AxesHelper(initialConfig.axesHelperLength));
    }

    this.emitter.on('experience/resize', this.handleResize);
  }

  public async initializePhysics() {
    return this.world.initialisePhysics(this.config);
  }

  public async start() {
    // TODO: add dev-time check for whether the method has been called?
    this.emitter.on('time/tick', this.handleTick);
  }

  private handleResize = (payload: Events['experience/resize']) => {
    this.camera.handleResize(payload);
    this.renderer.handleResize(payload);
  };

  private handleTick = (_timeData: Events['time/tick']) => {
    this.world.update();
    this.camera.update();
    this.renderer.render();
  };

  // TODO: test destruction of the scene
  // and assure all events are unsubbed
  public destroy = () => {
    this.emitter.off('experience/resize', this.handleResize);
    this.emitter.off('time/tick', this.handleTick);
    this.time.destroy();
    this.config.destroy();
    this.scene.clear(); // anything else to clear up the scene?
    this.camera.destroy();
  };
}
