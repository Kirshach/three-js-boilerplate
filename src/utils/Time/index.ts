import EventEmitter from '../EventEmitter';

export enum TimeEvents {
  TICK = 'TICK',
};

const animationFrameIds: number[] = [];

class Time extends EventEmitter<unknown, TimeEvents> {
  private start = Date.now();
  private current = Date.now();
  private elapsed = 0;
  private delta = 16; // assuming 60Hz screen for the first render

  constructor() {
    super();
    animationFrameIds.push(window.requestAnimationFrame(this.tick));
  }

  private tick = () => {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.elapsed = currentTime - this.start;
    this.current = currentTime;
    this.emit(TimeEvents.TICK, this);
    animationFrameIds.push(window.requestAnimationFrame(this.tick));
  }

  destroy() {
    animationFrameIds.forEach((animationFrameId) => window.cancelAnimationFrame(animationFrameId));
    super.destroy();
  }
}

export default Time;
