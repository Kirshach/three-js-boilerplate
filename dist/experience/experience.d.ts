import { Config, type ConfigParameters } from './config';
import { Loader } from './helpers/loader';
import { Camera } from './camera';
import { Canvas } from './canvas';
import { Renderer } from './renderer';
import { World } from './world';
export declare class Experience {
    private emitter;
    private scene;
    private time;
    config: Config;
    world: World;
    loader: Loader;
    canvas: Canvas;
    camera: Camera;
    renderer: Renderer;
    constructor(initialConfig: ConfigParameters);
    start(): void;
    private handleResize;
    private handleTick;
    destroy: () => void;
}
