import type {EventEmitter} from '../event-emitter';

export class Time {
  public readonly start = Date.now();
  public current = Date.now();
  public elapsed = 0;
  public delta = 16; // assuming 60Hz screen for the first render
  private animationFrameIds: number[] = [];

  constructor(private emitter: EventEmitter) {
    this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
  }

  private tick = () => {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.elapsed = currentTime - this.start;
    this.current = currentTime;
    this.emitter.emit('time/tick', this);
    this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
  };

  public destroy = () => {
    this.animationFrameIds.forEach(animationFrameId =>
      window.cancelAnimationFrame(animationFrameId)
    );
  };
}
