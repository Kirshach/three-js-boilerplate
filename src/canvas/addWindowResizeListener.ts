export const addWindowResizeListener = (canvas: HTMLCanvasElement) => {
  window.addEventListener("dblclick", () => {
    const fullscreenElement =
      // @ts-expect-error webkitFullscreenElement is a Safari shit property
      document.fullscreenElement || document.webkitFullscreenElement;

    if (!fullscreenElement) {
      canvas.requestFullscreen
        ? canvas.requestFullscreen()
        // @ts-expect-error Safari shit property      
        : canvas.webkitRequestFullscreen();
    } else {
      document.exitFullscreen
        ? document.exitFullscreen()
        // @ts-expect-error Safari shit property      
        : document.webkitExitFullscreen();
    }
  });
}
