export interface GLTFResource {
  type: 'gltf';
  path: string;
  preload?: boolean;
}

export interface TextureResource {
  type: 'texture';
  path: string;
  preload?: boolean;
}

export interface CubeTextureResource {
  type: 'cubeTexture';
  path: string[];
  preload?: boolean;
}

export interface Font {
  type: 'font';
  path: string;
  preload?: boolean;
}

export type Resource = GLTFResource | TextureResource | CubeTextureResource | Font;
