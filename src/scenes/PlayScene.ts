import { CST } from "../CST";

type Keyboard = {
  [i: string]: Phaser.Input.Keyboard.Key;
};

export class PlayScene extends Phaser.Scene {
  anna: Phaser.Physics.Arcade.Sprite;
  hooded: Phaser.Physics.Arcade.Sprite;
  keyboard: Keyboard;
  constructor() {
    super({ key: CST.SCENES.PLAY });
  }

  genFrameNumbers(key: string, start: number, end: number) {
    const nums = [];
    for (let i = start; i < end + 1; i++) nums.push(i);
    return this.anims.generateFrameNumbers(key, {
      start,
      end,
    });
  }

  animsForAnna() {
    this.anims.create({
      key: "up",
      frameRate: 10,
      frames: this.genFrameNumbers("anna", 0, 8),
    });
    this.anims.create({
      key: "left",
      frameRate: 10,
      frames: this.genFrameNumbers("anna", 9, 17),
    });
    this.anims.create({
      key: "down",
      frameRate: 10,
      frames: this.genFrameNumbers("anna", 18, 26),
    });
    this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.genFrameNumbers("anna", 27, 35),
    });
  }

  setIKeys() {
    const iKeys = Phaser.Input.Keyboard.KeyCodes;
    this.keyboard = <Keyboard>this.input.keyboard.addKeys({
      w: iKeys.W,
      s: iKeys.S,
      a: iKeys.A,
      d: iKeys.D,
    });
  }

  posChange(delta: number) {
    return (64 * delta) / 1000;
  }

  preload() {
    // ANIMATIONS FOR ANNA
    this.animsForAnna();

    this.anims.create({
      key: "blaze",
      duration: 50,
      frames: this.anims.generateFrameNames("daze", {
        prefix: "fire0",
        suffix: ".png",
        end: 55,
      }),
      showOnStart: true,
      hideOnComplete: true,
    });

    // TEXTURE FOR CHARACTERS
    this.textures.addSpriteSheetFromAtlas("hooded", {
      ...CST.FRAMES["64"],
      atlas: "characters",
      frame: "hooded",
    });
    this.textures.addSpriteSheetFromAtlas("mandy", {
      ...CST.FRAMES["64"],
      atlas: "characters",
      frame: "mandy",
    });

    // Animation for DAZE
    this.anims.create({
      key: "dazzle",
      frameRate: 10,
      frames: this.anims.generateFrameNames("daze", {
        prefix: "daze0",
        suffix: ".png",
        start: 0,
        end: 41,
      }),
      repeat: -1,
    });

    // ANIMATION FOR HOODED CHARACTER
    this.anims.create({
      key: "right",
      frameRate: 10,
      frames: this.genFrameNumbers("hooded", 143, 151),
    });
  }

  create() {
    this.setIKeys();

    this.hooded = this.physics.add
      .sprite(200, 200, "hooded")
      .setScale(2)
      //setImmovable means cant be pushed but can move, just weird api name
      .setImmovable(true);
    this.anna = this.physics.add.sprite(400, 400, "anna").setScale(2);
    // @ts-ignore
    window.hooded = this.hooded;
    // @ts-ignore
    window.anna = this.anna;

    this.input.on("pointermove", (p: Phaser.Input.Pointer) => {
      if (p.isDown) {
        let fire = this.add
          .sprite(p.x, p.y, "daze", "fire00.png")
          .play("blaze");
        fire.on("animationcomplete", () => {
          fire.destroy();
        });
      }
    });
  }

  update(time: number, delta: number) {
    // if (this.keyboard["w"].isDown) {
    //   this.anna.y -= this.posChange(delta);
    //   this.anna.play("up", true);
    // }
    this.physics.world.collide(this.anna, this.hooded, () => {});
    if (this.keyboard["w"].isDown) {
      this.anna.setVelocityY(-64);
      this.anna.play("up", true);
    }
    if (this.keyboard["s"].isDown) {
      this.anna.setVelocityY(64);
      this.anna.play("down", true);
    }

    if (this.keyboard["a"].isDown) {
      this.anna.setVelocityX(-64);
      this.anna.play("left", true);
    }
    if (this.keyboard["d"].isDown) {
      this.anna.setVelocityX(64);
      this.anna.play("right", true);
    }
    if (this.keyboard["a"].isUp && this.keyboard["d"].isUp) {
      this.anna.setVelocityX(0);
    }
    if (this.keyboard["w"].isUp && this.keyboard["s"].isUp) {
      this.anna.setVelocityY(0);
    }
  }
}
