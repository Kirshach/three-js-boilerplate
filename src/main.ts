import * as THREE from "three";

import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

import gsap from 'gsap';

import {
  camera,
  canvas,
  handleWindowResize,
  scene,
  orbitControls,
  renderer
} from './init'


const fontLoader = new FontLoader();

fontLoader.load('/Press_Start_2P_Regular.json', (font) => {

  const bevelThickness = 0.03;
  const bevelSize = 0.02;
  const textGeometry = new TextGeometry(
    'Fuck around\nand find out',
    {
      font,
      size: 0.5,
      height: 0.2,
      // controls how detailed curves are on letters like "o"
      curveSegments: 4,
      // bevels are front-facing "edges" of the letters
      bevelEnabled: true,
      // z-axis bevel depth
      bevelThickness,
      // x- and y-axis bevel width
      bevelSize,
      bevelOffset: 0,
      bevelSegments: 5,
    }
  );

  /**
   * Make THREE.js compute the box around the text (like getBoundingClientRect)
   * Bounding box DOESN'T include bevels
   */
  textGeometry.computeBoundingBox();
  const max = textGeometry.boundingBox?.max;
  /**
   * Translate geometry. Unlike just changing the position, this would move the origin
   * We don't move the Y axis though, since this two-lined text is already Y-centered. almost...
   */
  if (max) textGeometry.translate(
    /**
     * on X axis, we wanna move the geometry to the left half of what there is to it to the right:
     * its full width + right bevel (the left one spills to the left, so it shouldn't be accounted for)
     */
    - (max.x - bevelSize) * 0.5,
    // these are not really completely centered though :(
    - (bevelSize * 0.5),
    - (max.z - bevelThickness) * 0.);

  // ATTENTION! All of the above could be done by just   ing
  // textGeometry.center  ()!
  // It is here strictly for educational purposes :)


  const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, matcapMaterial);
  scene.add(text);

  // help visualise bounding box
  const box = new THREE.BoxHelper(text, 0xff0000)
  scene.add(box);


  /**
   * Donuts
   */
  const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, matcapMaterial);

    donut.position.set((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10);
    donut.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
    const scale = Math.max(Math.random(), 0.3);
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});


/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');


/**
 * Handle fullsize
 */
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    // @ts-expect-error webkitFullscreenElement is a Safari shit property
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    canvas.requestFullscreen
      ? canvas.requestFullscreen()
      : // @ts-expect-error webkitRequestFullscreenElement is also a Safari shit property
      canvas.webkitRequestFullscreen?.();
  } else {
    document.exitFullscreen
      ? document.exitFullscreen()
      : // @ts-expect-error and again a shit property
      document.webkitExitFullscreen?.();
  }
});

/**
 * Animation
 */
const tick = () => {
  renderer.render(scene, camera);
  orbitControls.update();
  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
