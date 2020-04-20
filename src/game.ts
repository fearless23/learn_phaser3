import "phaser";
import { PlayScene, LoadScene, MenuScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  // type: Phaser.AUTO,
  // backgroundColor: "#125555",
  width: 800,
  height: 600,
  scene: [LoadScene, MenuScene, PlayScene],
  render: {
    pixelArt: true, // When sprtiesheet are pixelated. Phaser
    // by default smooth sprites.
  },

  physics: {
    default: "arcade",
    arcade: {
      debug: true,
    },
  },
};

const game = new Phaser.Game(config);
