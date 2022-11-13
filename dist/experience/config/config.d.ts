import type { ConfigParameters } from './types';
import { EventEmitter } from '../helpers/event-emitter';
export declare class Config {
    private emitter;
    private maxDPI;
    antialias?: boolean;
    backgroundColor?: number | string;
    backgroundOpacity: number;
    canvas: HTMLCanvasElement;
    camera: ConfigParameters['camera'];
    height: number;
    pixelRatio: number;
    width: number;
    constructor(emitter: EventEmitter, initialConfig: ConfigParameters);
    private handleWindowResize;
    get DPI(): number;
    destroy(): void;
}
