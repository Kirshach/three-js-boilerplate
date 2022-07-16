import * as THREE from "three";

import { scene } from './scene';
import store from './store';

const setupRenderer = (camera: THREE.PerspectiveCamera) => {
  const { getState } = store;
  const { canvas: { element, sizes } } = getState();

  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvasSizes.width, canvasSizes.height);
  renderer.render(scene, camera);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    // change sizes
    canvasSizes.width = window.innerWidth;
    canvasSizes.height = window.innerHeight;
    // update aspect ratio
    camera.aspect = canvasSizes.width / canvasSizes.height;
    // notify Three.js about camera aspect change
    camera.updateProjectionMatrix();
    // resize renderer and the canvas size
    renderer.setSize(canvasSizes.width, canvasSizes.height);
    // just in case browser window got moved to i.e. an external monitor
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  return { renderer };
}

export { setupRenderer };
