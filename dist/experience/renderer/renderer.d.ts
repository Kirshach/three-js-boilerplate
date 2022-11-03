import * as THREE from 'three';
import type { Camera } from '../camera';
import type { Events } from '../helpers/event-emitter';
import type { Config } from '../config';
import type { Scene } from '../scene';
export declare class Renderer {
    private config;
    private scene;
    private camera;
    element: THREE.WebGLRenderer;
    constructor(config: Config, scene: Scene, camera: Camera);
    handleResize: ({ width, height, pixelRatio }: Events['experience/resize']) => void;
    render(): void;
}
