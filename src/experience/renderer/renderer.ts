import * as THREE from 'three';

import type { Camera } from '../camera';
import type { ConfigEventPayload } from '../config';
import type { Config } from '../config';
import type { Scene } from '../scene';

export class Renderer {
  public element: THREE.WebGLRenderer;

  constructor(
    private config: Config,
    private scene: Scene,
    private camera: Camera,
  ) {
    this.element = new THREE.WebGLRenderer({
      canvas: this.config.canvas,
      antialias: true,
      alpha: config.transparent,
    });
    this.element.physicallyCorrectLights = true;
    this.element.outputEncoding = THREE.sRGBEncoding;
    this.element.toneMapping = THREE.CineonToneMapping;
    this.element.toneMappingExposure = 1.75;
    this.element.shadowMap.enabled = true;
    this.element.shadowMap.type = THREE.PCFSoftShadowMap;
    this.element.setSize(this.config.width, this.config.height);
    this.element.setPixelRatio(Math.min(this.config.pixelRatio, this.config.DPI));
  }

  public handleResize = ({ width, height, pixelRatio }: ConfigEventPayload) => {
    this.element.setSize(width, height);
    this.element.setPixelRatio(Math.min(pixelRatio, this.config.DPI));
  };

  public render() {
    this.element.render(this.scene.element, this.camera.element);
  };
};
