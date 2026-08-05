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

export class GameField extends Scene {
  constructor() {
    super("GameField");
  }

  create() {
    this.socket = io("http://localhost:3000");
    this.otherPlayers = {};
    this.otherplayer = this.physics.add.group();

    this.socket.on("newplayer", (info) => {
      this.addOtherplayer(info);
    });
    this.socket.on("playermoved", (info) => {
      const sprite = this.otherPlayers[info.id];
      if (sprite) {
        sprite.setPosition(info.x, info.y);

        if (info.isAttacking && !sprite.isAttacking) {
          // console.log("k",info.pid,this.socket.id)
          // Only start a new attack if this sprite isn't already mid-attack
          console.log(sprite);
          if (info.aniname == "attacko1") {
            // alert(sprite.aniname)

            this.socket.emit("attacker", info);
          }

          // }

          // sprite.swordattack1(this,-2,15,"katana","katana-front","ninja-katna-front")
        }

        //  if(sprite.aniname=="attacko1"){
        //     this.isRockattack=false;
        //     this.player.playerAttck("attacko1","rockattack");

        //     }

        if (!info.isAttacking) {
          sprite.playRemoteAnim(info.anim, info.flipX);
        }

        if (info.isWeponAttack && !sprite.isWeponAttack) {
          console.log("chala");
          sprite.kunai(this, sprite.x, sprite.y, "shuriken", -500, "left");
        }
        console.log("info", info.isWeponAttack, sprite.isWeponAttack);
      }
    });
    console.log("k", this.otherplayer);

    this.socket.on("attacked01", (info) => {
      // alert("kk")
      if (this.socket.id != info.pid && !this.isRockattack) {
        console.log("zz");

        this.player.rockattack();
      }
    });

    this.socket.on("playerDisconnected", (id) => {
      if (this.otherPlayers[id]) {
        const sprite = this.otherPlayers[id];
        sprite.destroy();
        delete this.otherPlayers[id];
      }
    });

    this.socket.on("currentplayer", (player) => {
      console.log(player);
      Object.keys(player).forEach((id) => {
        if (id == this.socket.id) {
          this.addPLayer(player[id]);
        } else {
          this.addOtherplayer(player[id]);
        }
      });
    });
    //  this.player1=new Ninja(this,105,105)
    // console.log(this.otherPlayers)

    // platfrom

      //  this.createAndAddPlatfrom();

      this.score=0;
  

    this.time.addEvent({
        delay:7000,
        callback:this.createAndAddPlatfrom,
        callbackScope:this,
        loop:true

    })
    this.coinCollection=this.physics.add.group();
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
    // this.ChasingEnenmy = new ChasingEnemy(
    //   this,
    //   this.scale.width + 100,
    //   this.scale.height,
    // );
    this.setProperty = false;
    this.hearCollection=new Array();
    for(let i=0;i<3;i++){
      this.hearCollection.push(CreateNinjaAndAtaacks(this,10+(i*40),10,"heart").setScale(2))

    }
    this.ChasingEnemyGroup=this.physics.add.group();
    this.time.addEvent({
      delay:5000,
      callback:this.ChasingEnyCreate,
      callbackScope:this,
        loop:true

    })
   
       
    heartAnims(this.anims)
    this.lastHitTime = 0;
  }

  update() {
    this.allNPC.forEach((i) => {
      i.update();
    });

    if(this.player.health<=0){
      this.scene.start("Restart")
    }





    if (this.player && this.setc == false) {
      this.setc = true;
      const mapWidth = this.map.widthInPixels * 2;
      const mapHeight = this.map.heightInPixels * 2;
      this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
      this.physics.world.setBounds(0, 0, mapWidth, mapHeight);

      // Make the camera actually follow the player
      this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
      //setting up layers
      this.AllLayers.forEach((i) => {
        this.physics.add.collider(this.player, i);
        this.physics.add.collider(this.ChasingEnemyGroup,i)
      });
      //

this.physics.add.overlap(this.player, this.coinCollection, this.onCoinHit, null, this);
            //
      

      this.hearCollection.forEach((i)=>{
        i.setScrollFactor(0).setOrigin(0)
      });
      this.ScoreProperty={    fontSize: '32px',
    fill: 'black',
    fontFamily: 'Arial'
}
          this.scoreText = this.add.text(10, 90, `Score: ${this.score}`,    this.ScoreProperty
);
            this.scoreText.setScrollFactor(0).setOrigin(0)

      this.physics.add.collider(this.player,this.ChasingEnemyGroup,(player,enemy)=>{
        const now = this.time.now;
  if (now - this.lastHitTime > 500) { // simple 0.5s invulnerability window
    this.player.health = Math.max(0, this.player.health - 5);
    this.lastHitTime = now;

    const midX = (this.player.x + enemy.x) / 2;
    const midY = (this.player.y + enemy.y) / 2;
    let enemyattack = CreateNinjaAndAtaacks(this, midX, midY, "slash").setScale(2);
    enemyattack.body.checkCollision.none = true; 
    enemyattack.anims.play("s01", true);
    enemyattack.once('animationcomplete', (animation) => {
  if (animation.key === "s01" && enemyattack.active) {
    enemyattack.destroy();
  }
});
    
  }
     

      })


     

    }

 




     if(this.player&&this.hearCollection.length!=0&&this.player.health>0){
      
      const healthrange=Phaser.Math.Clamp(this.player.health,0,100)
      const MaxRangecut=100/this.hearCollection.length
      this.hearCollection.forEach((heart,i)=>{
        let heartRAnge=Phaser.Math.Clamp(healthrange-(i*MaxRangecut),0,MaxRangecut);
        let fraction= heartRAnge/MaxRangecut;

            let anim;
    if (fraction <= 0)        anim = "0_health";
    else if (fraction <= 0.25) anim = "2/4_health";
    else if (fraction <= 0.5)  anim = "half_health";
    else if (fraction <= 0.75) anim = "1/4_health";
    else                        anim = "full_health";

    heart.anims.play(anim, true);

      })
      
     

    }

   



    if (this.player) {
     
       this.ChasingEnemyGroup.getChildren().forEach((i)=>{
        i.update(this.player.x,this.player.y)
      })
      
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
    }

    if (!this.player) return;
    if (this.player) {
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

    this.physics.add.collider(this.player.kunia, this.ChasingEnemyGroup, this.onHit, null, this);
    this.physics.add.overlap(this.player.kunia, this.bammbooGrooup, this.onHit, null, this);
    this.physics.add.overlap(this.player.kunia, this.gladiatorCollection, this.onHit, null, this);
  }
} else {
  // kunia is gone — reset so the next thrown kunai gets fresh colliders
  // this.kunaiCollidersSet01 = false;
}
      this.socket.emit("playerMovement", {
        x: this.player.x,
        y: this.player.y,

        anim: this.player.anims.currentAnim?.key,
        flipX: this.player.flipX,
        isAttacking: this.player.isAttacking,
        isWeponAttack: this.player.isWeponAttack,
        pid: this.socket.id,
        isRockattack: this.player.isRockattack,
        aniname: this.player.aniname,
      });
    }
  }

  addPLayer(info) {
      this.player = new SinglePlayerNinja(
        this,
        this.mapWidth / 2 - 500,
        this.mapHeight / 2,
        true,
        info.id,
      );
    // this.player = new Galdiator(this, info.x, info.y);
  }

  addOtherplayer(info) {
    const sprite = new SinglePlayerNinja(this, info.x, info.y, false, info.id);
    sprite.playerId = info.id;
    this.otherPlayers[info.id] = sprite;
    this.otherplayer.add(sprite);
  }

  createAndAddPlatfrom() {
    // let Yaxis = Phaser.Math.Between(this.mapHeight / 2, this.mapHeight);
    // let Xaxis = Phaser.Math.Between(150, this.mapWidth - 150);
    let YaxisInc=Phaser.Math.Between(0,1000);
    let NumberOfcoin=Phaser.Math.Between(1,10)
    let Xaxis=Phaser.Math.Between(0,this.mapWidth)
     let Yaxis=Phaser.Math.Between(0,this.mapHeight)
    for(let i=0;i<NumberOfcoin;i++){
    let x=Xaxis+i*100
    let y=Yaxis+YaxisInc
    let coin = CreateNinjaAndAtaacks(this,x,y, "coin").setScale(2);
     this.anims.create({
      key: "coino1",
      frames: this.anims.generateFrameNames("coin", { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1,
    })
    coin.anims.play("coino1",true)
    this.coinCollection.add(coin)
    ;
  }
  ;

   
    

  
  }

  onHit(player, objectThatWasHit) {
    objectThatWasHit.takeDamage(25);
     if (this.player.kunia && this.player.kunia.active) {
    this.player.kunia.destroy();
  }
  }
  onCoinHit(player,coin){
    this.score=this.score+1
    this.scoreText.setText("score:"+this.score,this.ScoreProperty)
    coin.destroy();
  }

  fillMessage(message) {
    this.message.setText(message);
  }

  ChasingEnyCreate(){
    let enemyNUmber=Phaser.Math.Between(1,4);
    let Xaxis=Phaser.Math.Between(-1000,1000)
    let Yaxis=Phaser.Math.Between(-1000,1000)
    Xaxis=this.scale.width+Xaxis
    Yaxis=this.scale.height+Yaxis

    for(let i=0;i<enemyNUmber;i++){
      let enemy=new ChasingEnemy(this,Xaxis,Yaxis,"red_ninja")
      this.ChasingEnemyGroup.add(enemy)
    }
  }
}
