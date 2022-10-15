import Loader, {LoaderEvents} from '../utils/resources';
import Time, {TimeEvents} from '../utils/Time';

import type {ConfigEventPayload} from './config';
import Camera from './camera';
import Config, {ConfigEvents} from './config';
import Renderer from './renderer';
import World from './world';
import Scene from './scene';
import Canvas from './canvas';
import Environment from './environment';

class Experience {
  private config: Config;
  private scene: Scene;
  private world: World;
  private time: Time;
  private resources: Loader;
  private canvas: Canvas;
  private camera: Camera;
  private environment: Environment;
  private renderer: Renderer;

  constructor() {
    // non-dependant classes
    this.config = new Config();
    this.canvas = new Canvas();
    this.scene = new Scene();
    this.time = new Time();
    this.resources = new Loader();

    // dependant classes
    this.camera = new Camera(this.scene, this.canvas, this.config);
    this.environment = new Environment(this.resources, this.scene);
    this.renderer = new Renderer(this.config, this.scene, this.camera, this.canvas);
    this.world = new World(this.scene, this.resources);

    // event listeners
    this.config.subscribe(ConfigEvents.RESIZE, this.handleResize);
    this.time.subscribe(TimeEvents.TICK, this.handleTick);
    this.resources.subscribe(LoaderEvents.FINISH_LOADING, this.environment.initialize);
  }

  handleResize = (payload: ConfigEventPayload) => {
    this.camera.handleResize(payload);
    this.renderer.handleResize(payload);
  };

  handleTick = () => {
    this.camera.update();
    this.renderer.render();
  };

  destroy = () => {
    this.time.destroy();
    this.config.destroy();
    this.scene.clear(); // anything else to clear up the scene?
    this.camera.destroy();
  };
}

export default Experience;
