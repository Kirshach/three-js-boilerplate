export interface Dimensions2D {
  width: number;
  height: number;
};

export interface Dimensions3D extends Dimensions2D {
  depth: number;
};

export interface Coordinates {
  x: number;
  y: number;
  z: number;
};
