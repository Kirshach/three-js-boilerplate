import EventEmitter from '../event-emitter';

export enum TimeEvents {
  TICK = 'TICK',
};

export class Time extends EventEmitter<unknown, TimeEvents> {
  private start = Date.now();
  private current = Date.now();
  private elapsed = 0;
  private delta = 16; // assuming 60Hz screen for the first render
  private animationFrameIds: number[] = [];

  constructor() {
    super();
    this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
  }

  private tick = () => {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.elapsed = currentTime - this.start;
    this.current = currentTime;
    this.emit(TimeEvents.TICK, this);
    this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
  };

  public destroy = () => {
    this.animationFrameIds.forEach(
      animationFrameId => window.cancelAnimationFrame(animationFrameId)
    );
    super.destroy();
  }
}
