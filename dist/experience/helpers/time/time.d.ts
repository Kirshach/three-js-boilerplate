import type { EventEmitter } from '../event-emitter';
export declare class Time {
    private emitter;
    readonly start: number;
    current: number;
    elapsed: number;
    delta: number;
    private animationFrameIds;
    constructor(emitter: EventEmitter);
    private tick;
    destroy: () => void;
}
