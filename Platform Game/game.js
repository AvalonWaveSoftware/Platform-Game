const Engine = WebGameEngine.create("game");

const levelLabel = document.getElementById("levelLabel");
const timerLabel = document.getElementById("timerLabel");

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 1600;

const PART_LIBRARY = {
  ground: {
    color: "#475569",
    solid: true
  },
  platform: {
    color: "#64748b",
    solid: true
  },
  coin: {
    color: "#facc15",
    solid: false
  },
  goal: {
    color: "#34d399",
    solid: false
  }
};

const Levels = Array.isArray(window.GAME_LEVELS) && window.GAME_LEVELS.length
  ? window.GAME_LEVELS
  : [
      {
        name: "Default Level",
        spawn: { x: 96, y: 640 },
        parts: [
          { type: "ground", x: 0, y: 736, width: 640, height: 64 },
          { type: "goal", x: 544, y: 672, width: 32, height: 64 }
        ]
      }
    ];

const GameState = {
  levelIndex: 0,
  won: false
};

const RunTimer = {
  started: false,
  running: false,
  startMs: 0,
  elapsedMs: 0,

  start() {
    if (this.started || GameState.won) return;

    this.started = true;
    this.running = true;
    this.startMs = performance.now();
    this.elapsedMs = 0;
    updateTimerDisplay();
    setStatus("Timer started");
  },

  update() {
    if (!this.running || GameState.won) return;

    this.elapsedMs = performance.now() - this.startMs;
    updateTimerDisplay();
  },

  finish() {
    if (!this.started) {
      this.start();
    }

    this.elapsedMs = performance.now() - this.startMs;
    this.running = false;
    updateTimerDisplay();
  },

  format(ms) {
    const totalMs = Math.max(0, Math.floor(ms));
    const minutes = Math.floor(totalMs / 60000);
    const seconds = Math.floor((totalMs % 60000) / 1000);
    const milliseconds = totalMs % 1000;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(3, "0")}`;
  }
};

function getCurrentLevel() {
  return Levels[GameState.levelIndex];
}

function updateTimerDisplay() {
  if (timerLabel) {
    timerLabel.textContent = RunTimer.format(RunTimer.elapsedMs);
  }
}

function updateLevelLabel() {
  if (levelLabel) {
    levelLabel.textContent = `${GameState.levelIndex + 1} / ${Levels.length}`;
  }
}

function setStatus(message) {
  Engine.setStatus(message);
}

function normalizeLevel(level) {
  return {
    name: level.name || "Untitled Level",
    spawn: {
      x: Number(level.spawn?.x ?? 96),
      y: Number(level.spawn?.y ?? 640)
    },
    parts: Array.isArray(level.parts)
      ? level.parts
          .map((part) => ({
            type: part.type,
            x: Number(part.x ?? 0),
            y: Number(part.y ?? 0),
            width: Number(part.width ?? 32),
            height: Number(part.height ?? 32)
          }))
          .filter((part) => PART_LIBRARY[part.type])
      : []
  };
}

function makePartEntity(part) {
  const definition = PART_LIBRARY[part.type];

  if (part.type === "coin") {
    return new WebGameEngine.Entity({
      name: `coin-${part.x}-${part.y}`,
      tags: ["coin"],
      x: part.x,
      y: part.y,
      width: part.width,
      height: part.height,
      color: definition.color,
      data: {
        bobTime: Math.random() * Math.PI * 2,
        baseY: part.y
      },
      update(dt) {
        this.data.bobTime += dt * 4;
        this.y = this.data.baseY + Math.sin(this.data.bobTime) * 4;
      },
      draw(ctx, camera) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(
          Math.round(this.x - camera.x + this.width / 2),
          Math.round(this.y - camera.y + this.height / 2),
          this.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
      }
    });
  }

  if (part.type === "goal") {
    return new WebGameEngine.Entity({
      name: "goal",
      tags: ["goal"],
      x: part.x,
      y: part.y,
      width: part.width,
      height: part.height,
      color: definition.color,
      draw(ctx, camera) {
        const drawX = Math.round(this.x - camera.x);
        const drawY = Math.round(this.y - camera.y);

        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(drawX + 4, drawY, 4, this.height);

        ctx.fillStyle = this.color;
        ctx.fillRect(drawX + 8, drawY + 4, this.width - 8, 18);
      }
    });
  }

  return new WebGameEngine.Entity({
    name: part.type,
    x: part.x,
    y: part.y,
    width: part.width,
    height: part.height,
    color: definition.color,
    solid: definition.solid
  });
}

function makePlayer(level) {
  return new WebGameEngine.Entity({
    name: "player",
    tags: ["player"],
    x: level.spawn.x,
    y: level.spawn.y,
    width: 28,
    height: 40,
    color: "#60a5fa",
    gravity: 1800,
    data: {
      speed: 250,
      jumpForce: 650,
      score: 0,
      spawnX: level.spawn.x,
      spawnY: level.spawn.y,
      reachedGoal: false
    },
    update(dt, engine) {
      if (GameState.won) return;

      const left = engine.input.down("ArrowLeft") || engine.input.down("a") || engine.input.down("A");
      const right = engine.input.down("ArrowRight") || engine.input.down("d") || engine.input.down("D");
      const jump =
        engine.input.pressed(" ") ||
        engine.input.pressed("w") ||
        engine.input.pressed("W") ||
        engine.input.pressed("ArrowUp");

      this.vx = 0;

      if (left) this.vx = -this.data.speed;
      if (right) this.vx = this.data.speed;

      if ((left || right || jump) && !RunTimer.started) {
        RunTimer.start();
      }

      if (jump && this.onGround) {
        this.vy = -this.data.jumpForce;
      }

      engine.applyPhysics(this, dt);

      if (this.y > WORLD_HEIGHT + 300) {
        this.x = this.data.spawnX;
        this.y = this.data.spawnY;
        this.vx = 0;
        this.vy = 0;
        setStatus("Respawned");
      }
    },
    draw(ctx, camera) {
      const drawX = Math.round(this.x - camera.x);
      const drawY = Math.round(this.y - camera.y);

      ctx.fillStyle = this.color;
      ctx.fillRect(drawX, drawY, this.width, this.height);

      ctx.fillStyle = "#dbeafe";
      ctx.fillRect(drawX + 16, drawY + 8, 6, 6);
    },
    onCollision(other) {
      if (GameState.won) return;

      if (other.hasTag && other.hasTag("coin") && !other.remove) {
        other.remove = true;
        this.data.score += 1;
        setStatus(`Collected coin ${this.data.score}`);
      }

      if (other.hasTag && other.hasTag("goal") && !this.data.reachedGoal) {
        this.data.reachedGoal = true;
        completeCurrentLevel();
      }
    }
  });
}

function loadLevel(index) {
  GameState.levelIndex = WebGameEngine.Utils.clamp(index, 0, Levels.length - 1);

  const scene = Engine.currentScene;
  const level = normalizeLevel(getCurrentLevel());

  scene.clear();
  scene.worldWidth = WORLD_WIDTH;
  scene.worldHeight = WORLD_HEIGHT;
  Engine.camera.setWorldSize(WORLD_WIDTH, WORLD_HEIGHT);

  for (const part of level.parts) {
    scene.add(makePartEntity(part));
  }

  const player = scene.add(makePlayer(level));
  Engine.camera.follow(player);

  updateLevelLabel();
  setStatus(level.name);
}

function completeCurrentLevel() {
  const isFinalLevel = GameState.levelIndex >= Levels.length - 1;

  if (isFinalLevel) {
    finishGame();
    return;
  }

  GameState.levelIndex += 1;
  loadLevel(GameState.levelIndex);
}

function finishGame() {
  GameState.won = true;
  RunTimer.finish();

  const player = Engine.currentScene.getByName("player");
  if (player) {
    player.vx = 0;
    player.vy = 0;
    player.active = false;
  }

  setStatus(`You win! Final time: ${RunTimer.format(RunTimer.elapsedMs)}`);
}

function buildGameScene() {
  return new WebGameEngine.Scene("Game", {
    background: "#0f172a",
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    onEnter() {
      loadLevel(0);
    },
    update() {
      RunTimer.update();
    },
    draw(engine, ctx) {
      drawBackground(ctx, engine.camera);
    },
    ui(engine, ctx) {
      drawOverlay(ctx);
    }
  });
}

function drawBackground(ctx, camera) {
  ctx.fillStyle = "#111827";

  for (let i = 0; i < 90; i++) {
    const x = (i * 220) % WORLD_WIDTH;

    ctx.fillRect(
      Math.round(x - camera.x * 0.25),
      370 + (i % 5) * 22,
      150,
      180
    );
  }
}

function drawOverlay(ctx) {
  const timeText = RunTimer.format(RunTimer.elapsedMs);

  ctx.save();

  ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
  ctx.fillRect(16, 16, 360, 116);

  ctx.fillStyle = "#ffffff";
  ctx.font = "15px Arial";
  ctx.fillText(`Level: ${GameState.levelIndex + 1} / ${Levels.length}`, 28, 42);
  ctx.fillText(`Timer: ${RunTimer.started ? timeText : "starts on first move"}`, 28, 66);
  ctx.fillText(`Goal: reach the flag`, 28, 90);

  if (GameState.won) {
    ctx.fillStyle = "rgba(15, 23, 42, 0.90)";
    ctx.fillRect(235, 42, 500, 190);

    ctx.fillStyle = "#4ade80";
    ctx.font = "46px Arial";
    ctx.fillText("YOU WIN!", 370, 112);

    ctx.fillStyle = "#ffffff";
    ctx.font = "24px Arial";
    ctx.fillText(`Final Time: ${timeText}`, 350, 158);

    ctx.font = "16px Arial";
    ctx.fillText("Refresh the page to play again.", 390, 194);
  }

  ctx.restore();
}

Engine.addScene(buildGameScene());
Engine.setScene("Game");
updateTimerDisplay();
setStatus("Ready. Timer starts when you move.");
Engine.start();
