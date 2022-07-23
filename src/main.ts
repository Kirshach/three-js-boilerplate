import {
  camera,
  canvas,
  scene,
  orbitControls,
  renderer,
} from './init'


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
