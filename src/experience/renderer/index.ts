import * as THREE from 'three';

import type Camera from '../camera';
import type {ConfigEventPayload} from '../config';
import type Config from '../config';
import type Scene from '../scene';
import type Canvas from '../canvas';

class Renderer {
  threeJsRenderer: THREE.WebGLRenderer;

  constructor(
    private config: Config,
    private scene: Scene,
    private camera: Camera,
    private canvas: Canvas
  ) {
    this.threeJsRenderer = new THREE.WebGLRenderer({
      canvas: this.canvas.element,
      antialias: true,
    });
    this.threeJsRenderer.physicallyCorrectLights = true;
    this.threeJsRenderer.outputEncoding = THREE.sRGBEncoding;
    this.threeJsRenderer.toneMapping = THREE.CineonToneMapping;
    this.threeJsRenderer.toneMappingExposure = 1.75;
    this.threeJsRenderer.shadowMap.enabled = true;
    this.threeJsRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.threeJsRenderer.setSize(this.config.width, this.config.height);
    this.threeJsRenderer.setPixelRatio(Math.min(this.config.pixelRatio, this.config.DPI));
  }

  handleResize = ({width, height, pixelRatio}: ConfigEventPayload) => {
    this.threeJsRenderer.setSize(width, height);
    this.threeJsRenderer.setPixelRatio(Math.min(pixelRatio, this.config.DPI));
  };

  render = () => {
    this.threeJsRenderer.render(this.scene, this.camera.element);
  };
}

export default Renderer;
