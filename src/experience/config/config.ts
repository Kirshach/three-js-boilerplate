import type {ConfigParameters, PhysicsConfig} from './types';

import {EventEmitter} from '../event-emitter';

export class Config {
  public antialias?: boolean;
  public background: {
    color?: number | string;
    opacity: number;
  };
  public canvas: HTMLCanvasElement;
  public camera: ConfigParameters['camera'];
  public height: number;
  private maxDPI = 2;
  public physics: Required<PhysicsConfig> = {debug: false, gravity: -9.82};
  public pixelRatio: number;
  public width: number;

  constructor(private emitter: EventEmitter, initialConfig: ConfigParameters) {
    this.canvas = initialConfig.canvas;
    this.antialias = initialConfig.antialias;
    this.background = {
      color: initialConfig.backgroundColor,
      opacity: initialConfig.backgroundOpacity ?? 1,
    };
    this.camera = initialConfig.camera;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI); // restrict maximum `pixelRatio` to not overload mobile GPUs

    Object.assign(this.physics, initialConfig.physics ?? {});

    // event listeners
    window.addEventListener('resize', this.handleWindowResize);
  }

  // Has to be an arrow function to prevent losing context while allowing event listener removing
  private handleWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // handle the case where browser window is moved to a different screen
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);
    this.emitter.emit('experience/resize', {
      width: this.width,
      height: this.height,
      pixelRatio: this.pixelRatio,
    });
  };

  public get DPI() {
    return Math.min(window.devicePixelRatio, this.maxDPI);
  }

  public destroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
}
