import * as THREE from 'three';
import type { Canvas } from '../canvas';
import type { Config } from '../config';
import type { Scene } from '../scene';
import type { Events } from '../event-emitter';
export declare class Camera {
    private scene;
    private canvas;
    private config;
    element: THREE.PerspectiveCamera;
    private controls?;
    constructor(scene: Scene, canvas: Canvas, config: Config);
    handleResize({ width, height }: Events['experience/resize']): void;
    update(): void;
    destroy(): void;
}
