import { OtherCharAnims } from "../Anims/OtherCharAnims";
import { CharMovingFunc } from "./CharMOvingfunc";
import Phaser from "phaser";    
export class NPC extends Phaser.Physics.Arcade.Sprite 
{
    constructor(scene, x, y,name ) {
        super(scene, x, y);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        // this.setCollideWorldBounds(true);
         this.name=name
        OtherCharAnims(scene.anims,this.name,this.name)
        this.leahRAdius=100;
        this.homex=x;
        this.homey=y
        this.s=scene
        
       
        
         this.setOrigin(0.5, 0.5);
          this.setScale(2);
          this.setSize(24, 24);
          this.setOffset(-5, -5);
          
          
      

       
        this.anims.play(this.name+"-walk-front", true);
        this.moveTimer = scene.time.addEvent({
            delay: 1000,
            callback: ()=>{this.changeDirection()},
            callbackScope: this,
            loop: true
        });
        this.changeDirection();
        this.speed=10
        this.maxHealth = 100;
  this.health = this.maxHealth;

  const barWidth = 50;
  const barHeight = 5;
  this.barWidth = barWidth;

  // background (dark/gray) shows the "empty" track
  this.healthBarBg = this.scene.add.rectangle(this.x, this.y - 20, barWidth, barHeight, 0x000000)
    .setOrigin(0.5, 0.5)
    .setDepth(10);
      
    

  this.healthBarFg = this.scene.add.rectangle(this.x - barWidth / 2, this.y - 20, barWidth, barHeight, 0x00ff00)
    .setOrigin(0, 0.5)
    .setDepth(11);
   
    }


    changeDirection() {

        let distance=Phaser.Math.Distance.Between(this.x,this.y,this.homex,this.homey)
        if(distance>this.leahRAdius){
         const angle = Phaser.Math.Angle.Between(this.x, this.y, this.homex, this.homey);
         this.s.physics.velocityFromRotation(angle, this.speed, this.body.velocity);
             if (Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                this.anims.play(this.name + (this.body.velocity.x > 0 ? "-walk-right" : "-walk-left"), true);
            } else {
                this.anims.play(this.name + (this.body.velocity.y > 0 ? "-walk-front" : "-walk-up"), true);
            }

        }else{
        const directions = ["up", "down", "left", "right"];
        const randomDirection = Phaser.Math.RND.pick(directions);
        const speed = Phaser.Math.Between(50, 100);
        CharMovingFunc(randomDirection,this,speed,this.name)
        }
    }
    
   destroy(fromScene) {
  if (this.moveTimer) this.moveTimer.destroy();
  if (this.healthBarBg) this.healthBarBg.destroy();
  if (this.healthBarFg) this.healthBarFg.destroy();
  super.destroy(fromScene);
}
    update() {
  this.healthBarBg.setPosition(this.x, this.y - 20);
  this.healthBarFg.setPosition(this.x - this.barWidth / 2, this.y - 20);
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
    
}