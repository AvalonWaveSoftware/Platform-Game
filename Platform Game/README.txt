Avalon Standalone Game

How to run:
1. Open this folder in VS Code.
2. Open index.html.
3. Use Microsoft Live Preview or open it in a browser.

Files:
- index.html: page layout and HUD
- style.css: visual styling
- engine.js: reusable game engine
- levels.js: level data
- game.js: standalone game logic

How to add more levels:
1. Open levels.js.
2. Copy one full level object.
3. Paste it inside the GAME_LEVELS array after the last level.
4. Change the name, spawn point, and parts.
5. Make sure the level has at least one goal.

Example part:
{ type: "ground", x: 0, y: 736, width: 704, height: 64 }

Available part types:
- ground
- platform
- coin
- goal

The timer starts when the player first moves.
The timer stops when the player reaches the goal on the final level.
