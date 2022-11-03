export interface Resource {
  type: 'gltf' | 'texture' | 'cubeTexture';
  path: string;
  preload?: boolean;
};

export interface ConfigParameters {
  canvas: HTMLCanvasElement;
  backgroundOpacity?: number;
  backgroundColor?: string | number;
  resources?: Resource[];
  antialias?: boolean;
};
