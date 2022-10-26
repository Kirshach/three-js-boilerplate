import { Loader } from '../utils/loader';
import { Time, TimeEvents } from '../utils/time';

import { Camera } from './camera';
import { Canvas } from './canvas';
import { Config, ConfigEvents } from './config';
import { Renderer } from './renderer';
import { World } from './world';
import { Scene } from './scene';

import type { ConfigEventPayload, ConfigParameters } from './config';

export class Experience {
  private scene: Scene;
  private time: Time;
  public config: Config;
  public world: World;
  public loader: Loader;
  public canvas: Canvas;
  public camera: Camera;
  public renderer: Renderer;

  public constructor(parameters: ConfigParameters) {
    // non-dependant classes
    this.config = new Config(parameters);
    this.canvas = new Canvas(parameters);
    this.scene = new Scene();
    this.time = new Time();
    this.loader = new Loader();

    // dependant classes
    this.camera = new Camera(this.scene, this.canvas, this.config);
    this.renderer = new Renderer(this.config, this.scene, this.camera);
    this.world = new World(this.scene);

    // TODO: create a global event bus instead
    // event listeners
    this.config.subscribe(ConfigEvents.RESIZE, this.handleResize);
  }

  public start() {
    this.time.subscribe(TimeEvents.TICK, this.handleTick);
  }

  private handleResize = (payload: ConfigEventPayload) => {
    this.camera.handleResize(payload);
    this.renderer.handleResize(payload);
  };

  private handleTick = () => {
    this.camera.update();
    this.renderer.render();
  };

  // TODO: test destruction of the scene
  public destroy = () => {
    this.time.destroy();
    this.config.destroy();
    this.scene.clear(); // anything else to clear up the scene?
    this.camera.destroy();
  };
};
