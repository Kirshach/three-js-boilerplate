export interface Resource {
  type: 'gltf' | 'texture' | 'cubeTexture';
  path: string;
  preload?: boolean;
}

export interface PhysicsConfig {
  gravity: number;
  debug: boolean;
}

export interface ConfigParameters {
  antialias?: boolean;
  axesHelperLength?: number;
  backgroundOpacity?: number;
  backgroundColor?: string | number;
  camera?: {
    near?: number;
    far?: number;
    controls?: true;
  };
  canvas: HTMLCanvasElement;
  resources?: Resource[];
  physics?: Partial<PhysicsConfig>;
}
