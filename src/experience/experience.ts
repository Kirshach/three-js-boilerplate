import mitt from 'mitt';

import {Config, type ConfigParameters} from './config';
import {Loader} from './helpers/loader';
import {Time} from './helpers/time';
import {Camera} from './camera';
import {Canvas} from './canvas';
import {Renderer} from './renderer';
import {World} from './world';
import {Scene} from './scene';

import type {EventEmitter, Events} from '../types/event-emitter';

export class Experience {
  private emitter: EventEmitter;
  private scene: Scene;
  private time: Time;
  public config: Config;
  public world: World;
  public loader: Loader;
  public canvas: Canvas;
  public camera: Camera;
  public renderer: Renderer;

  public constructor(parameters: ConfigParameters) {
    this.emitter = mitt<Events>();
    this.config = new Config(this.emitter, parameters);
    this.canvas = new Canvas(parameters);
    this.scene = new Scene();
    this.time = new Time(this.emitter);
    this.loader = new Loader();

    this.camera = new Camera(this.scene, this.canvas, this.config);
    this.renderer = new Renderer(this.config, this.scene, this.camera);
    this.world = new World(this.scene);

    this.emitter.on('experience/resize', this.handleResize);
  }

  public start() {
    this.emitter.on('time/tick', this.handleTick);
  }

  private handleResize = (payload: Events['experience/resize']) => {
    this.camera.handleResize(payload);
    this.renderer.handleResize(payload);
  };

  private handleTick = (_timeData: Events['time/tick']) => {
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
