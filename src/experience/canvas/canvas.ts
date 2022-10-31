import {ConfigParameters} from '../config';

export class Canvas {
  element: HTMLCanvasElement;

  constructor(config: ConfigParameters) {
    this.element = config.canvas;
  }
}
