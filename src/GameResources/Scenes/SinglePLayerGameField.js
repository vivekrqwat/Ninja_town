import { Scene } from "phaser";
import Phaser from "phaser";

import { Ninja } from "../NInja/Ninja";
import { io } from "socket.io-client";
import { CreateNinjaAndAtaacks } from "../Funtions/CharacterFunctions/CreateNinjaAndAttacks";
import { Galdiator } from "../otherChar/Galdiator";
import { NPC } from "../otherChar/NPC";
import { ChasingEnemy } from "../otherChar/ChasingEney";
import { heartAnims } from "../Anims/HeartAnims";
import { SinglePlayerNinja } from "../NInja/SinglePlayerNinja";

export class SinglePlayerGameField extends Scene {
  constructor() {
    super("SinglePlayerGameField");
  }

  create() {
    this.score = 0;
    // alert("X for attack and S key for teleporation")

    this.time.addEvent({
      delay: 4000,
      callback: this.createAndAddPlatfrom,
      callbackScope: this,
      loop: true,
    });
    this.coinCollection = this.physics.add.group();
    this.bammbooGrooup = this.physics.add.group();
    this.gladiatorCollection = this.physics.add.group();
    const map = this.make.tilemap({ key: "ninjatowno1" });
    this.map = map;
    const tilesetcollection = [
      { name: "Desert" },
      { name: "house" },
      { name: "tilefloor" },
      { name: "TilesetFloor" },
      { name: "nature" },
      { name: "Element" },
    ];

    const tileset = map.addTilesetImage("ninjatown01", "tiles");

    const tileset2 = map.addTilesetImage("Desert", "Desert");
    const tileset3 = map.addTilesetImage("house", "house");
    const tileset4 = map.addTilesetImage("tilefloor", "tilefloor");
    const tileset5 = map.addTilesetImage("TilesetFloor", "TilesetFloor");
    const tileset6 = map.addTilesetImage("nature", "nature");
    const tileset7 = map.addTilesetImage("Element", "Elements");
    const arr = [
      tileset,
      tileset2,
      tileset3,
      tileset4,
      tileset5,
      tileset6,
      tileset7,
    ];

    const background = map.createLayer("backgroundlayer", arr, 0, 0);
    const nature = map.createLayer("nature", arr, 0, 0);
    const rocks = map.createLayer("rocks", arr, 0, 0);
    const Element = map.createLayer("Elements", arr, 0, 0);

    const house = map.createLayer("house", arr, 0, 0);
    this.AllLayers = [background, nature, rocks, house, Element];
    background.setScale(2);
    rocks.setScale(2);
    nature.setScale(2);
    Element.setScale(2);
    house.setScale(2);

    this.AllLayers.forEach((i) => {
      i.setCollisionByProperty({ collide: true });
    });

    this.mapWidth = this.map.widthInPixels * 2;
    this.mapHeight = this.map.heightInPixels * 2;
    this.setc = false;
    const mapWidth = this.map.widthInPixels / 2;
    const mapHeight = this.map.heightInPixels / 2;
    this.bambooworriro = [
      { x: -350, y: 625 },
      { x: -350, y: 725 },
      { x: -450, y: 625 },
    ];
    this.kunaiCollidersSet01 = false;
    this.bambooworriro.forEach((i) => {
      let bambooo = new NPC(this, mapWidth + i.x, mapHeight + i.y, "bamboo");
      this.bammbooGrooup.add(bambooo);
    });
    const galdiatorgroup = [
      { x: 150, y: 1200 },
      { x: 150, y: 1300 },
      { x: 150, y: 1500 },
    ];
    galdiatorgroup.forEach((i) => {
      let gladidator = new NPC(
        this,
        mapWidth + i.x,
        mapHeight * 2 + i.y,
        "gladiator",
      );
      this.gladiatorCollection.add(gladidator);
    });

    this.player = new SinglePlayerNinja(
      this,
      this.mapWidth / 2 - 500,
      this.mapHeight / 2,
      true,
    );
    this.Beast = new NPC(this, mapWidth - 350, mapHeight / 2, "Beast");

    this.allNPC = [
      ...this.bammbooGrooup.getChildren(),
      this.Beast,
      ...this.gladiatorCollection.getChildren(),
    ];
    this.bambooenemy = new NPC(this, mapWidth / 2, mapHeight / 4, "flam");

    this.oldlady = CreateNinjaAndAtaacks(
      this,
      mapWidth + 150,
      mapHeight * 2,
      "oldlady",
    )
      .setScale(2)
      .setCollideWorldBounds(false);

    this.oldlady.body.setImmovable(true);
    this.messagebox = this.add
      .rectangle(900, 1800, this.mapWidth / 4, 100, "#86cd32")
      .setVisible(false);
    this.message = this.message = this.add
      .text(900, 1800 - 10, "", {
        fontFamily: "Arial",
        fontSize: "32px",
        color: "#dbe6db",
      })
      .setOrigin(0.5, 0.5);
    this.message.setVisible(false);

    this.physics.add.collider(this.player, this.oldlady, () => {
      this.oldlady.body.setVelocity(0, 0);
      this.messagebox.setVisible(true);
      this.fillMessage("hello ninja,how can i help");
      this.message.setVisible(true);
      this.time.delayedCall(1000, () => {
        this.messagebox.setVisible(false);
        this.message.setVisible(false);
      });
    });

    // this.ChasingEnenmy = new ChasingEnemy(
    //   this,
    //   this.scale.width + 100,
    //   this.scale.height,
    // );
    this.setProperty = false;
    this.hearCollection = new Array();
    for (let i = 0; i < 3; i++) {
      this.hearCollection.push(
        CreateNinjaAndAtaacks(this, 10 + i * 40, 10, "heart").setScale(2),
      );
    }
    this.ChasingEnemyGroup = this.physics.add.group();
    this.time.addEvent({
      delay: 5000,
      callback: this.ChasingEnyCreate,
      callbackScope: this,
      loop: true,
    });

    heartAnims(this.anims);
    this.lastHitTime = 0;

    const mapWidth1 = this.map.widthInPixels * 2;
    const mapHeight1 = this.map.heightInPixels * 2;
    this.cameras.main.setBounds(0, 0, mapWidth1, mapHeight1);
    this.physics.world.setBounds(0, 0, mapWidth1, mapHeight1);

    // Make the camera actually follow the player
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    //setting up layers
    this.AllLayers.forEach((i) => {
      this.physics.add.collider(this.player, i);
      this.physics.add.collider(this.ChasingEnemyGroup, i);
    });
    //

    this.physics.add.overlap(
      this.player,
      this.coinCollection,
      this.onCoinHit,
      null,
      this,
    );
    //

    this.hearCollection.forEach((i) => {
      i.setScrollFactor(0).setOrigin(0);
    });
    this.ScoreProperty = {
      fontSize: "32px",
      fill: "black",
      fontFamily: "Arial",
    };
    this.scoreText = this.add.text(
      10,
      90,
      `Score: ${this.score}`,
      this.ScoreProperty,
    );
    this.scoreText.setScrollFactor(0).setOrigin(0);

    this.physics.add.collider(
      this.player,
      this.ChasingEnemyGroup,
      (player, enemy) => {
        const now = this.time.now;
        if (now - this.lastHitTime > 500) {
          // simple 0.5s invulnerability window
          this.player.health = Math.max(0, this.player.health - 5);
          this.lastHitTime = now;

          const midX = (this.player.x + enemy.x) / 2;
          const midY = (this.player.y + enemy.y) / 2;
          let enemyattack = CreateNinjaAndAtaacks(
            this,
            midX,
            midY,
            "slash",
          ).setScale(2);
          enemyattack.body.checkCollision.none = true;
          enemyattack.anims.play("s01", true);
          enemyattack.once("animationcomplete", (animation) => {
            if (animation.key === "s01" && enemyattack.active) {
              enemyattack.destroy();
            }
          });
        }
      },
    );
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
     this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

    this.physics.add.overlap(
      this.player,
      this.ChasingEnemyGroup,
      (player, enemy) => {
        if (this.player.isAttacking) {
          enemy.takeDamage(1000);
        }
      },
      null,
      this,
    );
    this.physics.add.collider(this.ChasingEnemyGroup, this.ChasingEnemyGroup);

    //keyboard
    this.setKeyBoard=false;
  }

  update() {
   
    this.allNPC.forEach((i) => {
      i.update();
    });
    if (this.player.health <= 0) {
      this.scene.stop("SinglePlayerGameField");
      this.scene.start("Restart", { score: this.score });
    }

    if (
      this.player &&
      this.hearCollection.length != 0 &&
      this.player.health >= 0
    ) {
      const healthrange = Phaser.Math.Clamp(this.player.health, 0, 100);
      const MaxRangecut = 100 / this.hearCollection.length;
      this.hearCollection.forEach((heart, i) => {
        let heartRAnge = Phaser.Math.Clamp(
          healthrange - i * MaxRangecut,
          0,
          MaxRangecut,
        );
        let fraction = heartRAnge / MaxRangecut;

        let anim;
        if (fraction <= 0) anim = "0_health";
        else if (fraction <= 0.25) anim = "2/4_health";
        else if (fraction <= 0.5) anim = "half_health";
        else if (fraction <= 0.75) anim = "1/4_health";
        else anim = "full_health";

        heart.anims.play(anim, true);
      });
    }

    this.ChasingEnemyGroup.getChildren().forEach((i) => {
      i.update(this.player.x, this.player.y);
    });

    this.player.update();

    if (this.player.kunia != null) {
      if (!this.kunaiCollidersSet01) {
        // this.kunaiCollidersSet01 = true;

        this.physics.add.overlap(this.player.kunia, this.Beast, () => {
          this.Beast.takeDamage(50);
          if (this.player.kunia && this.player.kunia.active) {
            this.player.kunia.destroy();
          }
        });

        this.physics.add.collider(
          this.player.kunia,
          this.ChasingEnemyGroup,
          this.onHit,
          null,
          this,
        );
        this.physics.add.overlap(
          this.player.kunia,
          this.bammbooGrooup,
          this.onHit,
          null,
          this,
        );
        this.physics.add.overlap(
          this.player.kunia,
          this.gladiatorCollection,
          this.onHit,
          null,
          this,
        );
      }
    } else {
      // kunia is gone — reset so the next thrown kunai gets fresh colliders
      // this.kunaiCollidersSet01 = false;
    }

    //setting keyboard
    if(this.scale.width<=880&&!this.setKeyBoard){
        this.setKeyBoard=true;
        const keyScale=2;
        const startX = 70;
    const startY = (this.scale.height/2)+200;
    const spacing = 60;
    const Xstart=this.scale.width-100
    const Ystart=(this.scale.height/2)+200
    this.cursor = this.input.keyboard.createCursorKeys();

    // --- LEFT BUTTON ---
    const leftBtn = this.add
      .image(startX, startY, "Key")
      .setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
      .setAngle(0); // Kept facing left

    leftBtn.on("pointerdown", () => (this.cursor.left.isDown = true));
    leftBtn.on("pointerup", () => (this.cursor.left.isDown = false));
    leftBtn.on("pointerout", () => (this.cursor.left.isDown = false));

    // --- UP BUTTON ---
    const upBtn = this.add
      .image(startX + spacing, startY - spacing, "Key")
      .setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
      .setAngle(90); // Rotated to point up

    upBtn.on("pointerdown", () => (this.cursor.up.isDown = true));
    upBtn.on("pointerup", () => (this.cursor.up.isDown = false));
    upBtn.on("pointerout", () => (this.cursor.up.isDown = false));

    // --- DOWN BUTTON ---
    const downBtn = this.add
      .image(startX + spacing, startY, "Key")
      .setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
      .setAngle(-90); // Rotated to point down

    downBtn.on("pointerdown", () => (this.cursor.down.isDown = true));
    downBtn.on("pointerup", () => (this.cursor.down.isDown = false));
    downBtn.on("pointerout", () => (this.cursor.down.isDown = false));

    // --- RIGHT BUTTON ---
    const rightBtn = this.add
      .image(startX + spacing * 2, startY, "Key")
      .setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
      .setAngle(180); // Rotated to face right

    rightBtn.on("pointerdown", () => (this.cursor.right.isDown = true));
    rightBtn.on("pointerup", () => (this.cursor.right.isDown = false));
    rightBtn.on("pointerout", () => (this.cursor.right.isDown = false))

//--X  
        const Xbtn=this.add.image(Xstart,Ystart,"X").setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
         Xbtn.on("pointerdown", () => ( this.keyS.isDown = true));
    Xbtn.on("pointerup", () => (this.keyS.isDown = false));
    Xbtn.on("pointerout", () => (this.keyS.isDown = false))
    const Sbtn=this.add.image(Xstart+spacing,Ystart,"Y").setScale(keyScale)
      .setInteractive()
      .setScrollFactor(0)
         Sbtn.on("pointerdown", () => (this.keyX.isDown=true
            
         ));
    Sbtn.on("pointerup", () => (this.keyX.isDown = false));
    Sbtn.on("pointerout", () => (this.keyX.isDown = false))


    }


  }

  createAndAddPlatfrom() {
    // let Yaxis = Phaser.Math.Between(this.mapHeight / 2, this.mapHeight);
    // let Xaxis = Phaser.Math.Between(150, this.mapWidth - 150);
    let YaxisInc = Phaser.Math.Between(0, 1000);
    let NumberOfcoin = Phaser.Math.Between(1, 15);
    let Xaxis = Phaser.Math.Between(0, this.scale.width);
    let Yaxis = Phaser.Math.Between(0, this.scale.height);
    for (let i = 0; i < NumberOfcoin; i++) {
      let x = Xaxis + i * 100;
      let y = Yaxis + YaxisInc;
      let coin = CreateNinjaAndAtaacks(this, x, y, "coin").setScale(2);
      this.time.delayedCall(11000, () => {
        coin.destroy();
      });
      this.anims.create({
        key: "coino1",
        frames: this.anims.generateFrameNames("coin", { frames: [0, 1, 2, 3] }),
        frameRate: 10,
        repeat: -1,
      });
      coin.anims.play("coino1", true);
      this.coinCollection.add(coin);
    }
  }

  onHit(player, objectThatWasHit) {
    objectThatWasHit.takeDamage(25);
    if (this.player.kunia && this.player.kunia.active) {
      this.player.kunia.destroy();
    }
  }
  onCoinHit(player, coin) {
    this.score = this.score + 1;
    this.scoreText.setText("score:" + this.score, this.ScoreProperty);
    coin.destroy();
  }

  fillMessage(message) {
    this.message.setText(message);
  }

  ChasingEnyCreate() {
    let enemyNUmber = Phaser.Math.Between(1, 4);
    let Xaxis = Phaser.Math.Between(this.player.x - 500, this.player.x + 500);
    let Yaxis = Phaser.Math.Between(this.player.y - 500, this.player.y + 500);
    // Xaxis = this.scale.width + Xaxis;
    // Yaxis = this.scale.height + Yaxis;

    for (let i = 0; i < enemyNUmber; i++) {
      let enemy = new ChasingEnemy(this, Xaxis, Yaxis, "red_ninja");
      this.ChasingEnemyGroup.add(enemy);
    }
  }
}
