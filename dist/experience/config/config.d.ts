import type { ConfigParameters, PhysicsConfig } from './types';
import { EventEmitter } from '../event-emitter';
export declare class Config {
    private emitter;
    antialias?: boolean;
    background: {
        color?: number | string;
        opacity: number;
    };
    canvas: HTMLCanvasElement;
    camera: ConfigParameters['camera'];
    height: number;
    private maxDPI;
    physics: Required<PhysicsConfig>;
    pixelRatio: number;
    width: number;
    constructor(emitter: EventEmitter, initialConfig: ConfigParameters);
    private handleWindowResize;
    get DPI(): number;
    destroy(): void;
}
