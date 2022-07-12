import * as THREE from "three";
import CameraControls from "camera-controls";
import GUI from 'lil-gui';
import gsap from 'gsap';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const canvas = document.getElementById("my-scene") as HTMLElement;

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load('/textures/matcaps/1.png');

/**
 * Font
 */
const fontLoader = new FontLoader();

fontLoader.load('/Press_Start_2P_Regular.json', (font) => {
  const bevelThickness = 0.03;
  const bevelSize = 0.02;
  const textGeometry = new TextGeometry(
    'Fuck around',
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
  // textGeometry.ce  ()!
  // It is here strictly for educational purposes :)


  const matcapMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });
  const text = new THREE.Mesh(textGeometry, matcapMaterial);
  scene.add(text);

  // help visualise bounding box
  const box = new THREE.BoxHelper(text, 0xff0000)
  scene.add(box);
  /**
   * Debug      
   */
  const gui = new GUI();
  // prevent double clicks on debug UI from entering fullscreen mode
  gui.domElement.addEventListener('dblclick', (evt) => evt.stopPropagation());

  /**
   * Position
   */
  const positionFolder = gui.addFolder('position');
  for (const axis of Object.keys(text.position)) {
    positionFolder.add(text.position, axis).min(-5).max(5);
  }

  gui.add(text, 'visible');
  gui.addColor(matcapMaterial, 'color');
  gui.add(box, 'visible').name('bounding box visible');

  /**
   * Spin animation
   */
  const functions = {
    spin: () => {
      gsap.to(text.rotation, { y: text.rotation.y + Math.PI * 2, duration: 1 });
    },
    getBoundingBox: () => {
      window.alert(JSON.stringify(textGeometry.boundingBox))
    }
  };
  gui.add(functions, 'spin');
  gui.add(functions, 'getBoundingBox');

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
 * Window sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // change sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  // update aspect ratio
  camera.aspect = sizes.width / sizes.height;
  // notify Three.js about camera aspect change
  camera.updateProjectionMatrix();
  // resize renderer and the canvas size
  renderer.setSize(sizes.width, sizes.height);
  // just in case browser window got moved to i.e. an external monitor
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
CameraControls.install({ THREE });

const camera = new THREE.PerspectiveCamera(
  60, // vertical FOV
  sizes.width / sizes.height, // aspect ratio
  0.1, // near-distance cutoff
  100 // far-distance cutoff
);
camera.position.set(1, 1, 5);
const cameraControls = new CameraControls(camera, canvas);

/**
 * Scene
 */
const scene = new THREE.Scene();
scene.add(camera);
scene.add(new THREE.AxesHelper(3));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
const clock = new THREE.Clock();
const startTime = clock.getElapsedTime();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  cameraControls.update(elapsedTime - startTime);

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
};

requestAnimationFrame(tick);
