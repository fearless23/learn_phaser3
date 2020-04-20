import { CST } from "../CST";

export class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: CST.SCENES.MENU });
  }

  init() {}

  create() {
    const { LOGO, TITLEBG, PLAYBTN, OPTSBTN } = CST.IMAGES;
    const { CAT } = CST.SPRITES;
    const { TITLEMUSIC } = CST.AUDIOS;
    const { width, height } = this.game.renderer;

    this.add.image(width / 2, height * 0.2, LOGO).setDepth(1);
    this.add.image(0, 0, TITLEBG).setOrigin(0).setDepth(0);
    const playBtn = this.add.image(width / 2, height / 2, PLAYBTN).setDepth(1);
    const optsBtn = this.add
      .image(width / 2, height / 2 + 100, OPTSBTN)
      .setDepth(1);

    // Mouse Pointer Icon
    let mouseIcon = this.add.sprite(100, 100, CAT);
    mouseIcon.setScale(2);
    mouseIcon.setVisible(false);

    // this.sound.play(TITLEMUSIC, { loop: true });

    this.anims.create({
      key: "walk",
      frameRate: 4,
      repeat: -1,
      frames: this.anims.generateFrameNumbers(CAT, { frames: [0, 1, 2, 3] }),
    });

    playBtn.setInteractive();
    playBtn.on("pointerover", () => {
      mouseIcon.setVisible(true);
      mouseIcon.play("walk");
      mouseIcon.x = playBtn.x - playBtn.width;
      mouseIcon.y = playBtn.y;
    });
    playBtn.on("pointerout", () => {
      mouseIcon.setVisible(false);
    });
    playBtn.on("pointerup", () => {
      this.scene.start(CST.SCENES.PLAY)
    });
    // playBtn.on("pointerdown", () => {
    //   console.log("cll");
    // });

    optsBtn.setInteractive();
    optsBtn.on("pointerover", () => {
      mouseIcon.setVisible(true);
      mouseIcon.play("walk");
      mouseIcon.x = optsBtn.x - optsBtn.width;
      mouseIcon.y = optsBtn.y;
    });
    optsBtn.on("pointerout", () => {
      mouseIcon.setVisible(false);
    });
    optsBtn.on("pointerup", () => {
      // console.log("clicked");
    });
    // optsBtn.on("pointerdown", () => {
    //   console.log("cll");
    // });
  }
}
