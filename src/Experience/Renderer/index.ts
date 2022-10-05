import * as THREE from 'three';

import { SizesEventPayload } from '../../utils/Sizes';
import Camera from '../Camera';

import Experience from '../index';

class Renderer {
  threeJsRenderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: Camera;

  constructor() {
    const {
      parameters: { canvas, maxDPI },
      sizes: { width, height, pixelRatio },
      scene,
      camera,
    } = Experience.instance;

    this.scene = scene;
    this.camera = camera;

    this.threeJsRenderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
    });
    this.threeJsRenderer.physicallyCorrectLights = true;
    this.threeJsRenderer.outputEncoding = THREE.sRGBEncoding;
    this.threeJsRenderer.toneMapping = THREE.CineonToneMapping;
    this.threeJsRenderer.toneMappingExposure = 1.75;
    this.threeJsRenderer.shadowMap.enabled = true;
    this.threeJsRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.threeJsRenderer.setSize(width, height);
    this.threeJsRenderer.setPixelRatio(Math.min(pixelRatio, maxDPI));
  }

  handleResize({ width, height, pixelRatio }: SizesEventPayload) {
    const { parameters: { maxDPI } } = Experience.instance;

    this.threeJsRenderer.setSize(width, height);
    this.threeJsRenderer.setPixelRatio(Math.min(pixelRatio, maxDPI));
  }

  render() {
    this.threeJsRenderer.render(this.scene, this.camera.threeJsCamera);
  }
}

export default Renderer;