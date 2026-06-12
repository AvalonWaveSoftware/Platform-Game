/*
  Add more levels here.

  To make a new level:
  1. Copy one of the level objects.
  2. Paste it under the last level.
  3. Change the name, spawn point, and parts.

  Required part types:
  - ground
  - platform
  - coin
  - goal

  Important:
  Each level should have at least one goal.
  The final level's goal is the one that triggers the win screen.
*/

window.GAME_LEVELS = [
  {
    name: "Level 1",
    spawn: { x: 96, y: 640 },
    parts: [
      { type: "ground", x: 0, y: 736, width: 704, height: 64 },
      { type: "platform", x: 288, y: 640, width: 128, height: 24 },
      { type: "coin", x: 320, y: 600, width: 20, height: 20 },
      { type: "coin", x: 448, y: 696, width: 20, height: 20 },
      { type: "goal", x: 608, y: 672, width: 32, height: 64 }
    ]
  },

  {
    name: "Level 2",
    spawn: { x: 96, y: 640 },
    parts: [
      { type: "ground", x: 0, y: 736, width: 384, height: 64 },
      { type: "ground", x: 544, y: 736, width: 384, height: 64 },
      { type: "platform", x: 352, y: 640, width: 128, height: 24 },
      { type: "platform", x: 544, y: 560, width: 128, height: 24 },
      { type: "coin", x: 384, y: 600, width: 20, height: 20 },
      { type: "coin", x: 576, y: 520, width: 20, height: 20 },
      { type: "goal", x: 800, y: 672, width: 32, height: 64 }
    ]
  },

  {
    name: "Level 3",
    spawn: { x: 96, y: 640 },
    parts: [
      { type: "ground", x: 0, y: 736, width: 320, height: 64 },
      { type: "platform", x: 352, y: 672, width: 96, height: 24 },
      { type: "platform", x: 512, y: 608, width: 96, height: 24 },
      { type: "platform", x: 672, y: 544, width: 96, height: 24 },
      { type: "ground", x: 832, y: 736, width: 320, height: 64 },
      { type: "coin", x: 384, y: 632, width: 20, height: 20 },
      { type: "coin", x: 544, y: 568, width: 20, height: 20 },
      { type: "coin", x: 704, y: 504, width: 20, height: 20 },
      { type: "goal", x: 1040, y: 672, width: 32, height: 64 }
    ]
  }
  
  ,
  {
      "name": "Level 4",
      "spawn": {
        "x": 0,
        "y": 672
      },
      "parts": [
        {
          "type": "ground",
          "x": 0,
          "y": 736,
          "width": 640,
          "height": 64
        },
        {
          "type": "ground",
          "x": 640,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 704,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 768,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 864,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 960,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1024,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1024,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 928,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 832,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 896,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1024,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1120,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1216,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1312,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1408,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1504,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1600,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1696,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1792,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1888,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 1952,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2080,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2240,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2336,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2400,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2400,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2400,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2112,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "goal",
          "x": 2432,
          "y": 672,
          "width": 32,
          "height": 64
        },
        {
          "type": "ground",
          "x": 64,
          "y": 704,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 96,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 160,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 128,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 192,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 224,
          "y": 704,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 352,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 384,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 352,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 160,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 192,
          "y": 576,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 224,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 576,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 352,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 352,
          "y": 576,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 416,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 448,
          "y": 704,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 384,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 320,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 512,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 512,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 480,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 288,
          "y": 480,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 416,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 448,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 480,
          "y": 704,
          "width": 64,
          "height": 64
        },
        {
          "type": "coin",
          "x": 96,
          "y": 640,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 192,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 288,
          "y": 448,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 384,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 480,
          "y": 640,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 640,
          "y": 704,
          "width": 20,
          "height": 20
        },
        {
          "type": "platform",
          "x": 736,
          "y": 640,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 896,
          "y": 576,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1120,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "coin",
          "x": 1152,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 928,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "platform",
          "x": 1408,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1568,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1728,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1888,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 2048,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 2208,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 2304,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 2400,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "ground",
          "x": 2464,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2496,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2496,
          "y": 640,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2496,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2496,
          "y": 736,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2496,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2432,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 2400,
          "y": 544,
          "width": 64,
          "height": 64
        },
        {
          "type": "platform",
          "x": 2176,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 2144,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1984,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1824,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "coin",
          "x": 1728,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "platform",
          "x": 1344,
          "y": 608,
          "width": 96,
          "height": 24
        }
      ]
    },
    {
      "name": "Level 5",
      "spawn": {
        "x": 0,
        "y": 672
      },
      "parts": [
        {
          "type": "ground",
          "x": 0,
          "y": 736,
          "width": 640,
          "height": 64
        },
        {
          "type": "platform",
          "x": 96,
          "y": 672,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 256,
          "y": 640,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 416,
          "y": 608,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 544,
          "y": 576,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 736,
          "y": 544,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 928,
          "y": 640,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1120,
          "y": 736,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1312,
          "y": 992,
          "width": 96,
          "height": 24
        },
        {
          "type": "platform",
          "x": 1536,
          "y": 1184,
          "width": 96,
          "height": 24
        },
        {
          "type": "goal",
          "x": 1600,
          "y": 1120,
          "width": 32,
          "height": 64
        },
        {
          "type": "coin",
          "x": 1504,
          "y": 1056,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 1312,
          "y": 832,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 1120,
          "y": 640,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 896,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 576,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 448,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 320,
          "y": 608,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 128,
          "y": 640,
          "width": 20,
          "height": 20
        }
      ]
    },
    {
      "name": "Level 6",
      "spawn": {
        "x": 0,
        "y": 672
      },
      "parts": [
        {
          "type": "ground",
          "x": 0,
          "y": 736,
          "width": 640,
          "height": 64
        },
        {
          "type": "ground",
          "x": 64,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 160,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 256,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 352,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 448,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 512,
          "y": 576,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 608,
          "y": 576,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 672,
          "y": 608,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 672,
          "y": 672,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 640,
          "y": 800,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 704,
          "y": 800,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 768,
          "y": 800,
          "width": 64,
          "height": 64
        },
        {
          "type": "ground",
          "x": 576,
          "y": 800,
          "width": 64,
          "height": 64
        },
        {
          "type": "coin",
          "x": 224,
          "y": 704,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 320,
          "y": 704,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 416,
          "y": 704,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 576,
          "y": 704,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 704,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 192,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 288,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 384,
          "y": 576,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 512,
          "y": 544,
          "width": 20,
          "height": 20
        },
        {
          "type": "coin",
          "x": 768,
          "y": 768,
          "width": 20,
          "height": 20
        },
        {
          "type": "goal",
          "x": 800,
          "y": 736,
          "width": 32,
          "height": 64
        }
      ]
    }
  ]

;
