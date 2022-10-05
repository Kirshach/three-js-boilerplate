import Experience from './Experience';

// Canvas
const canvas = document.getElementById('scene') as HTMLCanvasElement | null;
if (!canvas) {
  throw new Error('No canvas element found');
}

Experience.initialize({ canvas, maxDPI: 2 });
const experience = Experience.instance;
console.log({ experience });

// TODO: test destruction of the scene

