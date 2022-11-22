import {Config} from '../config';

export class Canvas {
  element: HTMLCanvasElement;

  constructor(config: Config) {
    this.element = config.canvas;
  }
}
