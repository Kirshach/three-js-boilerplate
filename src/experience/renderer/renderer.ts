import * as THREE from 'three';

import type { Camera } from '../camera';
import type { Events } from '../helpers/event-emitter';
import type { Config } from '../config';
import type { Scene } from '../scene';

export class Renderer {
  public element: THREE.WebGLRenderer;

  constructor(
    private config: Config,
    private scene: Scene,
    private camera: Camera,
  ) {
    const { opacity, canvas, antialias } = this.config;
    this.element = new THREE.WebGLRenderer({
      antialias,
      canvas: canvas,
      alpha: opacity < 1,
    });
    this.element.physicallyCorrectLights = true;
    this.element.outputEncoding = THREE.sRGBEncoding;
    this.element.toneMapping = THREE.CineonToneMapping;
    this.element.toneMappingExposure = 1.75;
    this.element.shadowMap.enabled = true;
    this.element.shadowMap.type = THREE.PCFSoftShadowMap;
    this.element.setSize(this.config.width, this.config.height);
    this.element.setPixelRatio(Math.min(this.config.pixelRatio, this.config.DPI));

    if (this.config.backgroundColor)
      this.element.setClearColor(this.config.backgroundColor, opacity < 1 ? opacity : undefined);
  }

  public handleResize = ({ width, height, pixelRatio }: Events['experience/resize']) => {
    this.element.setSize(width, height);
    this.element.setPixelRatio(Math.min(pixelRatio, this.config.DPI));
  };

  public render() {
    this.element.render(this.scene.element, this.camera.element);
  };
};
