export const sources = [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path:
      [
        'textures/environmentMap/px.jpg',
        'textures/environmentMap/nx.jpg',
        'textures/environmentMap/py.jpg',
        'textures/environmentMap/ny.jpg',
        'textures/environmentMap/pz.jpg',
        'textures/environmentMap/nz.jpg',
      ],
  },
  {
    name: 'fox',
    type: 'gltf',
    path: '/models/Duck/glTF-Draco/Duck.gltf'
  }
] as const;

export type Sources = typeof sources;
