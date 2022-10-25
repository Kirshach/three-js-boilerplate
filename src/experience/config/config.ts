import EventEmitter from '../../utils/event-emitter';

import type { ConfigParameters, ConfigEventPayload } from './types';

export enum ConfigEvents {
  RESIZE = 'RESIZE',
};

export class Config extends EventEmitter<ConfigEventPayload, ConfigEvents> {
  private maxDPI = 2;
  public width: number;
  public height: number;
  public pixelRatio: number;
  public transparent?: boolean;
  public canvas: HTMLCanvasElement;

  constructor(config: ConfigParameters) {
    super();

    // mandatory fields
    this.canvas = config.canvas;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // restrict maximum `pixelRatio` to not overload mobile GPUs
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);

    // optional fields
    this.transparent = config.transparent;

    // event listeners
    window.addEventListener('resize', this.handleWindowResize);
  }

  // Has to be an arrow function to prevent losing context while allowing event listener removing
  private handleWindowResize = () => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log({ height: this.height, width: this.width });
    // handle the case where browser window is moved to a different screen
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);
    this.emit(ConfigEvents.RESIZE, this);
  };

  public get DPI() {
    return Math.min(window.devicePixelRatio, this.maxDPI);
  }

  public destroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    super.destroy();
  };
}
