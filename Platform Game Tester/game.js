const Engine = WebGameEngine.create("game");

const levelNameEl = document.getElementById("levelName");
const levelNumberEl = document.getElementById("levelNumber");

const WORLD_WIDTH = 3200;
const WORLD_HEIGHT = 1600;

const PART_LIBRARY = {
  ground: {
    color: "#475569"
  },
  platform: {
    color: "#64748b"
  },
  coin: {
    color: "#facc15"
  },
  goal: {
    color: "#34d399"
  }
};

function normalizeImportedLevel(level, index) {
  const safeData = level && level.data ? level.data : level;

  return {
    name: level && level.name ? String(level.name) : `Level ${index + 1}`,
    completed: Boolean(level && level.completed),
    data: {
      spawn: {
        x: Number(safeData.spawn?.x) || 96,
        y: Number(safeData.spawn?.y) || 640
      },
      parts: Array.isArray(safeData.parts)
        ? safeData.parts
            .filter((part) => PART_LIBRARY[part.type])
            .map((part) => ({
              type: part.type,
              x: Number(part.x) || 0,
              y: Number(part.y) || 0,
              width: Number(part.width) || (part.type === "goal" ? 32 : part.type === "coin" ? 20 : 64),
              height: Number(part.height) || (part.type === "goal" ? 64 : part.type === "coin" ? 20 : part.type === "platform" ? 24 : 64)
            }))
        : []
    }
  };
}

const Campaign = {
  currentIndex: 0,
  levels: []
};

if (!window.GAME_CAMPAIGN || !Array.isArray(window.GAME_CAMPAIGN.levels) || window.GAME_CAMPAIGN.levels.length === 0) {
  throw new Error("GAME_CAMPAIGN is missing or invalid in campaign.js");
}

Campaign.levels = window.GAME_CAMPAIGN.levels.map((level, index) =>
  normalizeImportedLevel(level, index)
);

Campaign.currentIndex = Math.max(
  0,
  Math.min(Number(window.GAME_CAMPAIGN.currentIndex) || 0, Campaign.levels.length - 1)
);

function getCurrentLevel() {
  return Campaign.levels[Campaign.currentIndex];
}

function updateLevelUI() {
  const level = getCurrentLevel();

  if (levelNameEl) {
    levelNameEl.textContent = level.name;
  }

  if (levelNumberEl) {
    levelNumberEl.textContent = `${Campaign.currentIndex + 1} / ${Campaign.levels.length}`;
  }
}

function createSolidBlock(scene, part) {
  return scene.add(
    new WebGameEngine.Entity({
      name: part.type,
      tags: ["solid-part"],
      x: part.x,
      y: part.y,
      width: part.width,
      height: part.height,
      color: PART_LIBRARY[part.type].color,
      solid: true
    })
  );
}

function createCoin(scene, part) {
  return scene.add(
    new WebGameEngine.Entity({
      name: "coin",
      tags: ["coin"],
      x: part.x,
      y: part.y,
      width: part.width,
      height: part.height,
      color: PART_LIBRARY.coin.color,
      data: {
        baseY: part.y,
        bobTime: Math.random() * Math.PI * 2
      },
      update(dt) {
        this.data.bobTime += dt * 5;
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
    })
  );
}

function createGoal(scene, part) {
  return scene.add(
    new WebGameEngine.Entity({
      name: "goal",
      tags: ["goal"],
      x: part.x,
      y: part.y,
      width: part.width,
      height: part.height,
      color: PART_LIBRARY.goal.color,
      draw(ctx, camera) {
        const drawX = Math.round(this.x - camera.x);
        const drawY = Math.round(this.y - camera.y);

        ctx.fillStyle = "#e5e7eb";
        ctx.fillRect(drawX + 4, drawY, 4, this.height);

        ctx.fillStyle = this.color;
        ctx.fillRect(drawX + 8, drawY + 4, this.width - 12, 14);
      }
    })
  );
}

function createPlayer(scene, spawn) {
  return scene.add(
    new WebGameEngine.Entity({
      name: "player",
      tags: ["player"],
      x: spawn.x,
      y: spawn.y,
      width: 28,
      height: 40,
      color: "#60a5fa",
      gravity: 1800,
      data: {
        speed: 240,
        jumpForce: 620,
        score: 0,
        spawnX: spawn.x,
        spawnY: spawn.y
      },
      update(dt, engine) {
        const left =
          engine.input.down("ArrowLeft") || engine.input.down("a") || engine.input.down("A");
        const right =
          engine.input.down("ArrowRight") || engine.input.down("d") || engine.input.down("D");
        const jump =
          engine.input.pressed(" ") ||
          engine.input.pressed("w") ||
          engine.input.pressed("W") ||
          engine.input.pressed("ArrowUp");

        this.vx = 0;
        if (left) this.vx = -this.data.speed;
        if (right) this.vx = this.data.speed;

        if (jump && this.onGround) {
          this.vy = -this.data.jumpForce;
        }

        engine.applyPhysics(this, dt);

        if (this.y > WORLD_HEIGHT + 300) {
          this.x = this.data.spawnX;
          this.y = this.data.spawnY;
          this.vx = 0;
          this.vy = 0;
          engine.setStatus("Respawned");
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
        if (other.hasTag && other.hasTag("coin") && !other.remove) {
          other.remove = true;
          this.data.score += 1;
          Engine.setStatus(`Collected coin ${this.data.score}`);
        }

        if (other.hasTag && other.hasTag("goal")) {
          advanceToNextLevel();
        }
      }
    })
  );
}

function buildLevelScene() {
  return new WebGameEngine.Scene("Game Scene", {
    background: "#0f172a",
    worldWidth: WORLD_WIDTH,
    worldHeight: WORLD_HEIGHT,
    onEnter(engine) {
      engine.camera.setWorldSize(WORLD_WIDTH, WORLD_HEIGHT);
      loadCurrentLevelIntoScene();
    },
    update(engine) {
      if (engine.input.pressed("r") || engine.input.pressed("R")) {
        restartCurrentLevel();
      }
    },
    draw(engine, ctx) {
      drawBackground(ctx, engine.camera);
    },
    ui(engine, ctx) {
      drawOverlayText(ctx);
    }
  });
}

function drawBackground(ctx, camera) {
  ctx.fillStyle = "#13203a";

  for (let i = 0; i < 24; i++) {
    const x = i * 220 - camera.x * 0.25;
    ctx.fillRect(Math.round(x), 380, 120, 280);
  }
}

function drawOverlayText(ctx) {
  ctx.save();

  ctx.fillStyle = "rgba(15, 23, 42, 0.78)";
  ctx.fillRect(16, 16, 260, 96);

  ctx.fillStyle = "#ffffff";
  ctx.font = "15px Arial";
  ctx.fillText(`Level: ${Campaign.currentIndex + 1} / ${Campaign.levels.length}`, 28, 40);
  ctx.fillText("Move: WASD / Arrows", 28, 64);
  ctx.fillText("Jump: Space / W / Arrow Up", 28, 88);

  ctx.restore();
}

function clearSceneEntities() {
  const scene = Engine.currentScene;
  if (!scene) return;
  scene.entities.length = 0;
}

function loadCurrentLevelIntoScene() {
  const scene = Engine.currentScene;
  const level = getCurrentLevel();
  if (!scene || !level) return;

  clearSceneEntities();

  for (const part of level.data.parts) {
    if (part.type === "ground" || part.type === "platform") {
      createSolidBlock(scene, part);
    } else if (part.type === "coin") {
      createCoin(scene, part);
    } else if (part.type === "goal") {
      createGoal(scene, part);
    }
  }

  const player = createPlayer(scene, level.data.spawn);
  Engine.camera.follow(player);
  updateLevelUI();
  Engine.setStatus(`Loaded ${level.name}`);
}

function restartCurrentLevel() {
  loadCurrentLevelIntoScene();
  Engine.setStatus(`Restarted ${getCurrentLevel().name}`);
}

function advanceToNextLevel() {
  Campaign.levels[Campaign.currentIndex].completed = true;

  if (Campaign.currentIndex < Campaign.levels.length - 1) {
    Campaign.currentIndex += 1;
    loadCurrentLevelIntoScene();
    Engine.setStatus(`Advanced to ${getCurrentLevel().name}`);
  } else {
    Engine.setStatus("You completed the campaign");
    restartCurrentLevel();
  }
}

Engine.addScene(buildLevelScene());
Engine.setScene("Game Scene");
Engine.start();
updateLevelUI();
