export type Store = {
  canvas: {
    element: HTMLCanvasElement | null,
    sizes: { width: number, height: number }
  };
  camera: THREE.PerspectiveCamera,
  cameraControls: unknown,
};
