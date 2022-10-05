import EventEmitter from '../EventEmitter';

import Experience from '../../Experience';

export interface SizesEventPayload {
  width: number;
  height: number;
  pixelRatio: number;
}

export enum SizesEvents {
  RESIZE = 'RESIZE',
};

class Sizes extends EventEmitter<SizesEventPayload, SizesEvents> {
  public width: number;
  public height: number;
  public pixelRatio: number;

  constructor() {
    super();
    const { parameters: { maxDPI = 2 } } = Experience.instance;

    this.width = window.innerWidth;
    this.height = window.innerHeight;
    // restrict maximum `pixelRatio` to not overload mobile GPUs
    this.pixelRatio = Math.min(window.devicePixelRatio, maxDPI);

    window.addEventListener('resize', this.handleWindowResize);
  }

  // Has to be an arrow function to prevent losing context while allowing event listener removing
  private handleWindowResize = () => {
    const { parameters: { maxDPI } } = Experience.instance;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    console.log({ height: this.height, width: this.width });
    // handle the case where browser window is moved to a different screen
    this.pixelRatio = Math.min(window.devicePixelRatio, maxDPI);
    this.emit(SizesEvents.RESIZE, this);
  }

  destroy() {
    window.removeEventListener('resize', this.handleWindowResize);
    super.destroy();
  }
}

export default Sizes;
