import type {ConfigParameters} from './types';

import {EventEmitter} from '../../types/event-emitter';

export class Config {
  private maxDPI = 2;
  public width: number;
  public height: number;
  public pixelRatio: number;
  public transparent?: boolean;
  public canvas: HTMLCanvasElement;

  constructor(private emitter: EventEmitter, initialConfig: ConfigParameters) {
    // mandatory fields
    this.canvas = initialConfig.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // restrict maximum `pixelRatio` to not overload mobile GPUs
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);

    // optional fields
    this.transparent = initialConfig.transparent;

    // event listeners
    window.addEventListener('resize', this.handleWindowResize);
  }

  // Has to be an arrow function to prevent losing context while allowing event listener removing
  private handleWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log({height: this.height, width: this.width});
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
