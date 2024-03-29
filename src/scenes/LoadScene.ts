import { CST } from "../CST";

export class LoadScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.LOAD });
  }

  init() {}

  loadImages() {
    this.load.setPath("./assets/images");
    Object.values(CST.IMAGES).forEach((val) => this.load.image(val, val));
  }

  loadSprites() {
    this.load.setPath("./assets/sprites");
    Object.values(CST.SPRITES).forEach((val) =>
      this.load.spritesheet(val, val, {
        frameWidth: 32,
        frameHeight: 32,
      })
    );
  }

  loadAudios() {
    this.load.setPath("./assets/audios");
    Object.values(CST.AUDIOS).forEach((val) => this.load.audio(val, val));
  }

  preload() {
    this.load.spritesheet("anna", "./assets/sprites/anna.png", {
      frameHeight: 64,
      frameWidth: 64,
    });

    this.load.atlas("characters", "./assets/sprites/characters.png", "./assets/sprites/characters.json")
    this.load.atlas("daze", "./assets/sprites/daze.png", "./assets/sprites/daze.json")
    this.loadImages();
    this.loadSprites();
    this.loadAudios();

    // Loading Bar
    let loadingBar = this.add.graphics({
      fillStyle: { color: 0xffffff },
    });

    this.load.on("progress", (per: number) => {
      const { height, width } = this.game.renderer;
      loadingBar.fillRect(0, height / 2, per * width, 50);
    });

    this.load.on("complete", () => {});
  }
  create() {
    this.scene.start(CST.SCENES.MENU);
  }
}
