export interface Resource {
    type: 'gltf' | 'texture' | 'cubeTexture';
    path: string;
    preload?: boolean;
}
export interface ConfigParameters {
    antialias?: boolean;
    axesHelperLength?: number;
    backgroundOpacity?: number;
    backgroundColor?: string | number;
    canvas: HTMLCanvasElement;
    resources?: Resource[];
    camera?: {
        near?: number;
        far?: number;
        controls?: true;
    };
}
