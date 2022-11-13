var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
function mitt(n) {
  return { all: n = n || /* @__PURE__ */ new Map(), on: function(t, e) {
    var i = n.get(t);
    i ? i.push(e) : n.set(t, [e]);
  }, off: function(t, e) {
    var i = n.get(t);
    i && (e ? i.splice(i.indexOf(e) >>> 0, 1) : n.set(t, []));
  }, emit: function(t, e) {
    var i = n.get(t);
    i && i.slice().map(function(n2) {
      n2(e);
    }), (i = n.get("*")) && i.slice().map(function(n2) {
      n2(t, e);
    });
  } };
}
class Config {
  constructor(emitter, initialConfig) {
    __publicField(this, "maxDPI", 2);
    __publicField(this, "antialias");
    __publicField(this, "backgroundColor");
    __publicField(this, "backgroundOpacity");
    __publicField(this, "canvas");
    __publicField(this, "camera");
    __publicField(this, "height");
    __publicField(this, "pixelRatio");
    __publicField(this, "width");
    __publicField(this, "handleWindowResize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);
      this.emitter.emit("experience/resize", {
        width: this.width,
        height: this.height,
        pixelRatio: this.pixelRatio
      });
    });
    var _a;
    this.emitter = emitter;
    this.canvas = initialConfig.canvas;
    this.antialias = initialConfig.antialias;
    this.backgroundColor = initialConfig.backgroundColor;
    this.backgroundOpacity = (_a = initialConfig.backgroundOpacity) != null ? _a : 1;
    this.camera = initialConfig.camera;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, this.maxDPI);
    window.addEventListener("resize", this.handleWindowResize);
  }
  get DPI() {
    return Math.min(window.devicePixelRatio, this.maxDPI);
  }
  destroy() {
    window.removeEventListener("resize", this.handleWindowResize);
  }
}
class Time {
  constructor(emitter) {
    __publicField(this, "start", Date.now());
    __publicField(this, "current", Date.now());
    __publicField(this, "elapsed", 0);
    __publicField(this, "delta", 16);
    __publicField(this, "animationFrameIds", []);
    __publicField(this, "tick", () => {
      const currentTime = Date.now();
      this.delta = currentTime - this.current;
      this.elapsed = currentTime - this.start;
      this.current = currentTime;
      this.emitter.emit("time/tick", this);
      this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
    });
    __publicField(this, "destroy", () => {
      this.animationFrameIds.forEach(
        (animationFrameId) => window.cancelAnimationFrame(animationFrameId)
      );
    });
    this.emitter = emitter;
    this.animationFrameIds.push(window.requestAnimationFrame(this.tick));
  }
}
class Camera {
  constructor(scene, canvas, config) {
    __publicField(this, "element");
    __publicField(this, "controls");
    var _a, _b, _c, _d, _e, _f;
    this.scene = scene;
    this.canvas = canvas;
    this.config = config;
    this.element = new THREE.PerspectiveCamera(
      35,
      this.config.width / this.config.height,
      (_b = (_a = this.config.camera) == null ? void 0 : _a.near) != null ? _b : 1,
      (_d = (_c = this.config.camera) == null ? void 0 : _c.far) != null ? _d : 500
    );
    this.element.position.set(6, 4, 8);
    this.scene.add(this.element);
    if (((_e = config.camera) == null ? void 0 : _e.controls) === true || ((_f = config.camera) == null ? void 0 : _f.controls) === void 0) {
      this.controls = new OrbitControls(this.element, this.canvas.element);
      this.controls.enableDamping = true;
    }
  }
  handleResize({ width, height }) {
    this.element.aspect = width / height;
    this.element.updateProjectionMatrix();
  }
  update() {
    var _a;
    (_a = this.controls) == null ? void 0 : _a.update();
  }
  destroy() {
    var _a;
    this.scene.remove(this.element);
    this.element.clear();
    this.element.removeFromParent();
    (_a = this.controls) == null ? void 0 : _a.dispose();
  }
}
class Canvas {
  constructor(config) {
    __publicField(this, "element");
    this.element = config.canvas;
  }
}
class Renderer {
  constructor(config, scene, camera) {
    __publicField(this, "element");
    __publicField(this, "handleResize", ({ width, height, pixelRatio }) => {
      this.element.setSize(width, height);
      this.element.setPixelRatio(Math.min(pixelRatio, this.config.DPI));
    });
    this.config = config;
    this.scene = scene;
    this.camera = camera;
    const { backgroundOpacity, canvas, antialias } = this.config;
    this.element = new THREE.WebGLRenderer({
      antialias,
      canvas,
      alpha: backgroundOpacity < 1
    });
    this.element.physicallyCorrectLights = true;
    this.element.outputEncoding = THREE.sRGBEncoding;
    this.element.toneMapping = THREE.CineonToneMapping;
    this.element.toneMappingExposure = 1.75;
    this.element.shadowMap.enabled = true;
    this.element.shadowMap.type = THREE.PCFSoftShadowMap;
    this.element.setSize(this.config.width, this.config.height);
    this.element.setPixelRatio(Math.min(this.config.pixelRatio, this.config.DPI));
    if (this.config.backgroundColor)
      this.element.setClearColor(this.config.backgroundColor, backgroundOpacity < 1 ? backgroundOpacity : void 0);
  }
  render() {
    this.element.render(this.scene.element, this.camera.element);
  }
}
class World {
  constructor(scene) {
    __publicField(this, "objects", {});
    this.scene = scene;
  }
  add(object, name) {
    if (name && this.objects[name]) {
      console.error(`Object with name ${name} already exists.`);
    }
    if (!!name) {
      this.objects[name] = object;
    }
    this.scene.add(object);
  }
  remove() {
  }
  handleFinishLoadingResources() {
  }
}
class Scene {
  constructor() {
    __publicField(this, "element");
    this.element = new THREE.Scene();
  }
  add(...objects) {
    this.element.add(...objects);
  }
  remove(...objects) {
    this.element.remove(...objects);
  }
  clear() {
    this.element.clear();
  }
}
class Experience {
  constructor(initialConfig) {
    __publicField(this, "emitter");
    __publicField(this, "scene");
    __publicField(this, "time");
    __publicField(this, "config");
    __publicField(this, "world");
    __publicField(this, "canvas");
    __publicField(this, "camera");
    __publicField(this, "renderer");
    __publicField(this, "handleResize", (payload) => {
      this.camera.handleResize(payload);
      this.renderer.handleResize(payload);
    });
    __publicField(this, "handleTick", (_timeData) => {
      this.camera.update();
      this.renderer.render();
    });
    __publicField(this, "destroy", () => {
      this.emitter.off("experience/resize", this.handleResize);
      this.emitter.off("time/tick", this.handleTick);
      this.time.destroy();
      this.config.destroy();
      this.scene.clear();
      this.camera.destroy();
    });
    this.emitter = mitt();
    this.config = new Config(this.emitter, initialConfig);
    this.canvas = new Canvas(this.config);
    this.scene = new Scene();
    this.time = new Time(this.emitter);
    this.camera = new Camera(this.scene, this.canvas, this.config);
    this.renderer = new Renderer(this.config, this.scene, this.camera);
    this.world = new World(this.scene);
    if (initialConfig.axesHelperLength) {
      this.world.add(new THREE.AxesHelper(initialConfig.axesHelperLength));
    }
    this.emitter.on("experience/resize", this.handleResize);
  }
  start() {
    this.emitter.on("time/tick", this.handleTick);
  }
}
const throwDevTimeError = (message) => {
  console.error(message);
};
class Loader {
  static load(resource) {
    THREE.Cache.enabled = true;
    if (resource.type === "gltf") {
      return new Promise(async (resolve, reject) => {
        var _a, _b;
        ((_b = (_a = this.loaders).gltf) != null ? _b : _a.gltf = await (async () => {
          const glTFLoader = new (await import("three/examples/jsm/loaders/GLTFLoader")).GLTFLoader(
            this.manager
          );
          const dracoLoader = new (await import("three/examples/jsm/loaders/DRACOLoader")).DRACOLoader(this.manager);
          dracoLoader.setDecoderPath("/draco/");
          glTFLoader.setDRACOLoader(dracoLoader);
          return glTFLoader;
        })()).load(
          resource.path,
          (resource2) => resolve(resource2),
          void 0,
          (error) => reject(error)
        );
      });
    }
    if (resource.type === "texture") {
      return new Promise(async (resolve, reject) => {
        var _a, _b;
        ((_b = (_a = this.loaders).texture) != null ? _b : _a.texture = new THREE.TextureLoader()).load(
          resource.path,
          (resource2) => {
            resource2.encoding = THREE.sRGBEncoding;
            resolve(resource2);
          },
          void 0,
          (error) => reject(error)
        );
      });
    }
    if (resource.type === "cubeTexture") {
      return new Promise((resolve, reject) => {
        var _a, _b;
        ((_b = (_a = this.loaders).cubeTexture) != null ? _b : _a.cubeTexture = new THREE.CubeTextureLoader()).load(
          resource.path,
          (resource2) => {
            resource2.encoding = THREE.sRGBEncoding;
            resolve(resource2);
          },
          void 0,
          (error) => reject(error)
        );
      });
    }
    if (resource.type === "font") {
      return new Promise(async (resolve, reject) => {
        var _a, _b;
        ((_b = (_a = this.loaders).font) != null ? _b : _a.font = new (await import("./FontLoader.97d8c397.js")).FontLoader()).load(
          resource.path,
          (resource2) => resolve(resource2),
          void 0,
          (error) => reject(error)
        );
      });
    }
    return throwDevTimeError(
      `Unknown resource type "${resource.type} " provided for file "${resource.path} "`
    );
  }
}
__publicField(Loader, "manager", new THREE.LoadingManager());
__publicField(Loader, "loaders", {});
export {
  Experience,
  Loader
};
