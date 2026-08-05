import Phaser from "phaser";
import {  MovingAnims } from "../Anims/MovingAction.js"
import { CharMovingFunc } from "./CharMOvingfunc.js";
import { OtherCharAnims } from "../Anims/OtherCharAnims.js";
import { CreateNinjaAndAtaacks } from "../Funtions/CharacterFunctions/CreateNinjaAndAttacks.js";
// import leaf from "../Resources/Objects/TeaLeaf.png"
export class Galdiator extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "gladiator");
        scene.add.existing(this);
          scene.physics.add.existing(this)
        this.setScale(2);
        this.setOrigin(0.5, 0.5);
        this.scene = scene;
        this.x=x
        this.y=y
        this.isObject=false;
       this.Textures=["leaf","grass","kunaio1","Scroll"]
           this.setCollideWorldBounds(true);
        //    MovingAnims(this.anims)
        this.name="ninjaG"
        this.char=["ninjaG,demon","gladiator","inspector","iceman","lion","women","oldman","Beast"]
        OtherCharAnims(scene.anims,this.name,this.name)
         
        //    console.log("gladiator created",this.anims)
        //    this.anims.play(this.name+"-idle-front",true)
           this.cursor= scene.input.keyboard.createCursorKeys();
           this.speed=300;
             this.isMoving=false;
             this.V=scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V)
            this.O=scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O)
            // scene.add.image(this.x,this.y,"leaf").setScale(2)
            this.change=false;
            this.a=false;

    }
  
update(){


    if(this.O.isDown&&!this.a){
       this.isObject = true;
       this.a=true
         this.index=Phaser.Math.Between(0,3)
        this.changOfObject=CreateNinjaAndAtaacks(this.scene,this.x,this.y,"boost").setScale(2);
          this.scene.anims.create({
            key:`boost`,
                frames:this.anims.generateFrameNames(`boost`,{frames:[0,1,2,3,4,5,7,8]}),
                 frameRate:15,
                
                   hideOnComplete:true

          })
         this.changOfObject.anims.play("boost",true)
          this.changOfObject.on("animationcomplete",(animation)=>{
            if(animation.key===`boost`){
            this.changOfObject.destroy()
           this.a=false;
         
        }

          })
         
        

    }

    if(this.isObject){
       this.setTexture(this.Textures[this.index]);
         

 if(this.cursor.up.isDown){
    this.setVelocityY(-200)
}else if(this.cursor.down.isDown){
    this.setVelocityY(200)
}else if(this.cursor.left.isDown){
    this.setVelocityX(-200)
}else if(this.cursor.right.isDown){
    this.setVelocityX(200)
}else{
    this.setVelocity(0,0)
}




    }

    if(this.V.isDown&&!this.change){
        this.isObject=false;
    this.change=true;
        let index=Phaser.Math.Between(0,7)
        this.name=this.char[index]
        this.setVelocity(0,0)
       
        console.log("char changed",this.name)
          OtherCharAnims(this.scene.anims,this.name,this.name)
          this.anims.play(this.name+"-idle-front",true)
          this.change=CreateNinjaAndAtaacks(this.scene,this.x,this.y,"boost").setScale(2);
          this.scene.anims.create({
            key:`boost`,
                frames:this.anims.generateFrameNames(`boost`,{frames:[0,1,2,3,4,5,7,8]}),
                 frameRate:15,
                
                   hideOnComplete:true

          })
       
          this.change.anims.play("boost",true)
          this.change.on("animationcomplete",(animation)=>{
            if(animation.key===`boost`){
            this.change.destroy()
            this.change=false;
         
        }

          })
         
        

    }
    else{
        if(this.V.isDown||this.change){return;
        }

         if(this.cursor.up.isDown){
        this.isMoving=true;
        CharMovingFunc("up",this,this.speed,this.name)

    }else if(this.cursor.down.isDown){
           this.isMoving=true;
           CharMovingFunc("down",this,this.speed,this.name)

    }else if(this.cursor.left.isDown){
           this.isMoving=true;
        CharMovingFunc("left",this,this.speed,this.name)}
        else if(this.cursor.right.isDown){
               this.isMoving=true;
            CharMovingFunc("right",this,this.speed,this.name)
        }else{
            
                this.anims.play( this.name+"-idle-front",true)
            this.setVelocity(0,0)
        }
        if(!this.isMoving){
               this.setVelocityX(0);
        this.setVelocityY(0);
        }


    }
    

    



    



}




 




}