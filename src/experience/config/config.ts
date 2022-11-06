import type { ConfigParameters } from './types';

import { EventEmitter } from '../helpers/event-emitter';

export class Config {
  private maxDPI = 2;
  public antialias?: boolean;
  public backgroundColor?: number | string;
  public backgroundOpacity: number;
  public canvas: HTMLCanvasElement;
  public cameraControls: boolean;
  public height: number;
  public pixelRatio: number;
  public width: number;

  constructor(private emitter: EventEmitter, initialConfig: ConfigParameters) {
    this.canvas = initialConfig.canvas;
    this.antialias = initialConfig.antialias;
    this.backgroundColor = initialConfig.backgroundColor;
    this.backgroundOpacity = initialConfig.backgroundOpacity ?? 1;
    this.cameraControls = initialConfig.cameraControls ?? true;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // restrict maximum `pixelRatio` to not overload mobile GPUs
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);

    // event listeners
    window.addEventListener('resize', this.handleWindowResize);
  }

  // Has to be an arrow function to prevent losing context while allowing event listener removing
  private handleWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // handle the case where browser window is moved to a different screen
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);
    this.emitter.emit('experience/resize', { width: this.width, height: this.height, pixelRatio: this.pixelRatio });
  }

  public get DPI() {
    return Math.min(window.devicePixelRatio, this.maxDPI);
  }

  public destroy() {
    window.removeEventListener('resize', this.handleWindowResize);
  }
}
