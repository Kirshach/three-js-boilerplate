export interface Resource {
  type: 'gltf' | 'texture' | 'cubeTexture';
  path: string;
  preload?: boolean;
}

export interface ConfigParameters {
  canvas: HTMLCanvasElement;
  transparent?: boolean;
  resources: Resource[];
}

export interface ConfigEventPayload {
  width: number;
  height: number;
  pixelRatio: number;
}
