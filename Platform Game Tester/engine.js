(function () {
  "use strict";

  class Utils {
    static clamp(value, min, max) {
      return Math.max(min, Math.min(max, value));
    }

    static rectsOverlap(a, b) {
      return (
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y < b.y + b.height &&
        a.y + a.height > b.y
      );
    }

    static uid() {
      return Math.random().toString(36).slice(2, 10);
    }

    static deepClone(value) {
      return JSON.parse(JSON.stringify(value));
    }
  }

  class InputManager {
    constructor(canvas) {
      this.keysDown = new Set();
      this.keysPressed = new Set();

      window.addEventListener("keydown", (e) => {
        if (!this.keysDown.has(e.key)) {
          this.keysPressed.add(e.key);
        }
        this.keysDown.add(e.key);
      });

      window.addEventListener("keyup", (e) => {
        this.keysDown.delete(e.key);
      });

      canvas.addEventListener("mousedown", () => {
        canvas.focus();
      });
    }

    down(key) {
      return this.keysDown.has(key);
    }

    pressed(key) {
      return this.keysPressed.has(key);
    }

    clearFrameState() {
      this.keysPressed.clear();
    }
  }

  class Camera {
    constructor(width, height) {
      this.x = 0;
      this.y = 0;
      this.width = width;
      this.height = height;
      this.worldWidth = width;
      this.worldHeight = height;
      this.target = null;
      this.lerp = 0.14;
    }

    setWorldSize(width, height) {
      this.worldWidth = width;
      this.worldHeight = height;
    }

    follow(target) {
      this.target = target;
    }

    update() {
      if (!this.target) return;

      const targetX = this.target.x + this.target.width / 2 - this.width / 2;
      const targetY = this.target.y + this.target.height / 2 - this.height / 2;

      this.x += (targetX - this.x) * this.lerp;
      this.y += (targetY - this.y) * this.lerp;

      this.x = Utils.clamp(this.x, 0, Math.max(0, this.worldWidth - this.width));
      this.y = Utils.clamp(this.y, 0, Math.max(0, this.worldHeight - this.height));
    }
  }

  class Entity {
    constructor(props = {}) {
      this.id = props.id || Utils.uid();
      this.name = props.name || "entity";
      this.tags = new Set(props.tags || []);
      this.x = props.x ?? 0;
      this.y = props.y ?? 0;
      this.width = props.width ?? 32;
      this.height = props.height ?? 32;
      this.vx = props.vx ?? 0;
      this.vy = props.vy ?? 0;
      this.color = props.color ?? "#ffffff";
      this.solid = props.solid ?? false;
      this.visible = props.visible ?? true;
      this.active = props.active ?? true;
      this.gravity = props.gravity ?? 0;
      this.remove = false;
      this.engine = null;
      this.scene = null;
      this.onGround = false;
      this.z = props.z ?? 0;
      this.data = props.data || {};
      this.start = props.start || function () {};
      this.update = props.update || function () {};
      this.draw =
        props.draw ||
        function (ctx, camera) {
          ctx.fillStyle = this.color;
          ctx.fillRect(
            Math.round(this.x - camera.x),
            Math.round(this.y - camera.y),
            this.width,
            this.height
          );
        };
      this.onCollision = props.onCollision || function () {};
    }

    hasTag(tag) {
      return this.tags.has(tag);
    }
  }

  class Scene {
    constructor(name, config = {}) {
      this.name = name;
      this.engine = null;
      this.entities = [];
      this.background = config.background || "#0f172a";
      this.worldWidth = config.worldWidth || 3000;
      this.worldHeight = config.worldHeight || 1500;
      this.onEnter = config.onEnter || function () {};
      this.onExit = config.onExit || function () {};
      this.update = config.update || function () {};
      this.draw = config.draw || function () {};
      this.ui = config.ui || function () {};
    }

    add(entity) {
      entity.engine = this.engine;
      entity.scene = this;
      this.entities.push(entity);
      if (entity.start) entity.start();
      return entity;
    }

    removeDestroyed() {
      this.entities = this.entities.filter((entity) => !entity.remove);
    }

    getByTag(tag) {
      return this.entities.filter((entity) => entity.hasTag(tag));
    }
  }

  class EngineCore {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.input = new InputManager(canvas);
      this.camera = new Camera(canvas.width, canvas.height);
      this.scenes = new Map();
      this.currentScene = null;
      this.lastTime = 0;
      this.deltaTime = 0;
      this.gravity = 1800;
      this.ui = {
        coinCount: document.getElementById("coinCount"),
        statusText: document.getElementById("statusText")
      };
    }

    addScene(scene) {
      scene.engine = this;
      this.scenes.set(scene.name, scene);
      return scene;
    }

    setScene(name) {
      const next = this.scenes.get(name);
      if (!next) {
        throw new Error(`Scene "${name}" does not exist.`);
      }

      if (this.currentScene) {
        this.currentScene.onExit(this);
      }

      this.currentScene = next;
      this.camera.setWorldSize(next.worldWidth, next.worldHeight);
      this.currentScene.onEnter(this);
    }

    setStatus(text) {
      if (this.ui.statusText) {
        this.ui.statusText.textContent = text;
      }
    }

    findSolidCollisions(entity) {
      return this.currentScene.entities.filter((other) => {
        return other !== entity && other.solid && Utils.rectsOverlap(entity, other);
      });
    }

    moveWithCollisions(entity, dt) {
      entity.onGround = false;

      entity.x += entity.vx * dt;
      const hitX = this.findSolidCollisions(entity);
      for (const other of hitX) {
        if (entity.vx > 0) {
          entity.x = other.x - entity.width;
        } else if (entity.vx < 0) {
          entity.x = other.x + other.width;
        }
        entity.vx = 0;
        entity.onCollision(other, "x");
      }

      entity.y += entity.vy * dt;
      const hitY = this.findSolidCollisions(entity);
      for (const other of hitY) {
        if (entity.vy > 0) {
          entity.y = other.y - entity.height;
          entity.onGround = true;
        } else if (entity.vy < 0) {
          entity.y = other.y + other.height;
        }
        entity.vy = 0;
        entity.onCollision(other, "y");
      }
    }

    applyPhysics(entity, dt) {
      entity.vy += (entity.gravity ?? this.gravity) * dt;
      this.moveWithCollisions(entity, dt);
    }

    syncUI() {
      if (!this.currentScene) return;

      const coins = this.currentScene.getByTag("coin").filter((coin) => !coin.remove).length;

      if (this.ui.coinCount) {
        this.ui.coinCount.textContent = String(coins);
      }
    }

    update(dt) {
      if (!this.currentScene) return;

      this.currentScene.update(this, dt);

      const entities = [...this.currentScene.entities].sort((a, b) => a.z - b.z);

      for (const entity of entities) {
        if (!entity.active) continue;
        entity.update(dt, this);
      }

      for (const entity of this.currentScene.entities) {
        if (!entity.active) continue;

        for (const other of this.currentScene.entities) {
          if (entity === other) continue;
          if (Utils.rectsOverlap(entity, other)) {
            entity.onCollision(other, "overlap");
          }
        }
      }

      this.currentScene.removeDestroyed();
      this.camera.update();
      this.syncUI();
    }

    render() {
      if (!this.currentScene) return;

      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      ctx.fillStyle = this.currentScene.background;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.currentScene.draw(this, ctx);

      const entities = [...this.currentScene.entities].sort((a, b) => a.z - b.z);
      for (const entity of entities) {
        if (!entity.visible) continue;
        entity.draw(ctx, this.camera, this);
      }

      this.currentScene.ui(this, ctx);
    }

    loop = (timestamp) => {
      if (!this.lastTime) this.lastTime = timestamp;
      let dt = (timestamp - this.lastTime) / 1000;
      this.lastTime = timestamp;
      dt = Math.min(dt, 0.033);
      this.deltaTime = dt;

      this.update(dt);
      this.render();
      this.input.clearFrameState();

      requestAnimationFrame(this.loop);
    };

    start() {
      requestAnimationFrame(this.loop);
    }
  }

  window.WebGameEngine = {
    create(canvasId = "game") {
      const canvas = document.getElementById(canvasId);
      if (!canvas) {
        throw new Error(`Canvas with id "${canvasId}" not found.`);
      }
      return new EngineCore(canvas);
    },
    Utils,
    Entity,
    Scene
  };
})();
