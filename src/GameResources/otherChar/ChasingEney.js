import Phaser from "phaser";
import { OtherCharAnims } from "../Anims/OtherCharAnims";
import { takeDamage } from "../Funtions/CharacterFunctions/TackDamage";
import { CreateNinjaAndAtaacks } from "../Funtions/CharacterFunctions/CreateNinjaAndAttacks";
import { MovingAnims } from "../Anims/MovingAction";

export class ChasingEnemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y,name) {
    super(scene, x, y);
    this.s = this.scene;

    scene.physics.add.existing(this);
    scene.add.existing(this);
    this.speed = 200;

    this.name = name;
    OtherCharAnims(scene.anims, this.name, this.name);
    MovingAnims(this.anims)
    this.anims.play(this.name + "-idle-front", true);
    this.setScale(2);

    this.setOrigin(0.5, 0.5);
    this.setSize(24, 24);
    this.setOffset(-5, -5);
    this.fireingDistance = 50;
    this.maxHealth = 100;
    this.health = this.maxHealth;
  

    const barWidth = 50;
    const barHeight = 5;
    this.barWidth = barWidth;

    // background (dark/gray) shows the "empty" track
    this.healthBarBg = this.scene.add.rectangle(this.x, this.y - 20, barWidth, barHeight, 0x000000)
      .setOrigin(0.5, 0.5)
      .setDepth(10);

    this.healthBarFg = this.scene.add.rectangle(
        this.x - barWidth / 2,
        this.y - 20,
        barWidth,
        barHeight,
        0x00ff00,
      )
      .setOrigin(0, 0.5)
      .setDepth(11);
     
      

    
  }
  update(playerx, playery) {
      this.healthBarBg.setPosition(this.x, this.y - 20);
  this.healthBarFg.setPosition(this.x - this.barWidth / 2, this.y - 20);
   if (this.health <= 0) {this.destroy(); return;}
    let distnace = Phaser.Math.Distance.Between(
      this.x,
      this.y,
      playerx,
      playery,
    );
    let x = this.x;
    let y = this.y;
    console.log(distnace);
    
    // if(distnace>=20&&distnace<=50){
    //     let enemyattack=CreateNinjaAndAtaacks(this.s,this.x,this.y,"slash").setScale(2)
    //    enemyattack.anims.play("s01",true);
    //    enemyattack.once('animationcomplete',(animation)=>{
    //     if(animation.key=="s01"){
    //       enemyattack.destroy();
    //     }
    //    })
    //    this.body.setBounce(0.8,0.8)

    // }

    if (distnace <= this.fireingDistance && distnace >= 0) {
      this.anims.play(this.name + "-idle-front", true);
      this.setVelocity(0, 0);
    } else {
      let angle = Phaser.Math.Angle.Between(this.x, this.y, playerx, playery);
      this.s.physics.velocityFromRotation(
        angle,
        this.speed,
        this.body.velocity,
      );
      if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
        this.anims.play(
          this.name + (this.body.velocity.x > 0 ? "-walk-right" : "-walk-left"),
          true,
        );
      } else {
        this.anims.play(
          this.name + (this.body.velocity.y > 0 ? "-walk-front" : "-walk-up"),
          true,
        );
      }
    }
  }



 takeDamage(amount) {
 
  this.health = Phaser.Math.Clamp(this.health - amount, 0, this.maxHealth);
  const pct = this.health / this.maxHealth;

  this.healthBarFg.width = this.barWidth * pct;

  // color shifts green -> yellow -> red as health drops
  if (pct > 0.5) this.healthBarFg.fillColor = 0x00ff00;
  else if (pct > 0.25) this.healthBarFg.fillColor = 0xffff00;
  else this.healthBarFg.fillColor = 0xff0000;

  if (this.health <= 0) this.destroy();
}




destroy(fromScene) {

  if (this.healthBarBg) this.healthBarBg.destroy();
  if (this.healthBarFg) this.healthBarFg.destroy();
  super.destroy(fromScene);
}



}
