import { MovingAnims } from "../Anims/MovingAction";
import { CreateNinjaAndAtaacks } from "../Funtions/CharacterFunctions/CreateNinjaAndAttacks";
import { NInjaMovement } from "../Funtions/CharacterFunctions/MovingChar";
import Phaser from "phaser";
import { CharMovingFunc } from "../otherChar/CharMOvingfunc";
import { OtherCharAnims } from "../Anims/OtherCharAnims";
export class Ninja extends Phaser.Physics.Arcade.Sprite{

    constructor(scene ,x,y,isLocal = true,id){
        super(scene,x,y)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.scId=id
        this.s=scene
        this.x=x
        this.y=y
        this.health=100
        this.setCollideWorldBounds(true);
        this.setScale(2);
        this.setSize(24,24)
            MovingAnims(scene.anims);
            this.charname="ninja"
            OtherCharAnims(scene.anims,this.charname,this.charname)
       
        //   this.aniname="attacko1"
        // this.name="rockattack"
   this.isLocal = isLocal;

   
    this.anims.play(`${this.name}-walk-front`);
        // Only wire up keyboard for the LOCAL player
        if (this.isLocal) {
            this.cursor = scene.input.keyboard.createCursorKeys();
            this.keyZ = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
            this.keyS = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.keyX = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        }
        this.isRockattack=false;
        this.isAttacking=false;
       this.isWeponAttack=false;
       this.ninaSpeed=300
        //   this.katna=CreateNinjaAndAtaacks(this.s,this.x,this.y,"katana").setScale(2);
        //        this.katna.setOrigin(0.5, 0.5);
        //        this.katna.anims.play("katana-front")
           



this.kunia=null;
       
    }
  update() {


   
    if(this.kunia!=null){

    
    this.kunia.angle+=10
    
    
}
  
    if (!this || !this.cursor) { 
        return; 
    }



    // if(this.katna&&this.isAttacking){
    //      const isDown = this.body.velocity.Y > 0;
    //     const YOffset = isDown ? 15 : -15; 
        
    //     // Continuously stick the katana to the dashing ninja
    //     this.katna.setPosition(this.x-5,this.y + YOffset);
    // }
    let ismoving = false;

    if(this.keyX.isDown&&!this.isWeponAttack){
        
         this.wepoanattack("shuriken")
      
    }

    if(this.keyS.isDown&&!this.isAttacking){
      ismoving=false;
    
        // this.setVelocity(0,0)
        // this.isAttacking=true;
        // this.slash=CreateNinjaAndAtaacks(this.s,this.x,this.y,"slash").setScale(2)
        // this.anims.play("ninja-spell",true)
        // this.slash.anims.play("s01");
        //   this.slash.once('animationcomplete', (animation) => {
            
        //     if(animation.key=="s01"){
        //         this.isAttacking = false;
        //         ismoving=false
        //         this.slash.destroy();
        //     }
        // });

        
        let attackindex=Phaser.Math.Between(0,2);
        let attackname=[
            {aniname:"attacko1",
                name:"rockattack"

            },
            {aniname:"s01",
                name:"slash"

            },
            {aniname:"attacko4",
                name:"explosion"

            },
            
        ]
        this.aniname=attackname[attackindex].aniname
        this.name=attackname[attackindex].name
      

       
        this.playerAttck(this.aniname,this.name);
        // this.wepoanattack("katana")
       
         
    }
    else{
        if(this.keyS.isDown){
            // console.log("called")
            return;}
    

           // 1. Rolling Mechanics (Z + Left or Right arrow)
    if (this.keyZ.isDown && (this.cursor.left.isDown || this.cursor.right.isDown)) {
        ismoving = true;
        if (this.cursor.left.isDown) {
            this.setVelocityX(-this.ninaSpeed);
            this.anims.play("ninja-roll-sideleft", true);
        } else {
            this.setVelocityX(this.ninaSpeed);
            this.anims.play("ninja-roll-sideright", true);
        }
    }
    // 2. Normal Horizontal Movement (Left / Right without Z)
    else if (this.cursor.right.isDown && !this.keyZ.isDown) {
        ismoving = true;
        // this.setVelocityX(this.ninaSpeed);
        // this.flipX = true;
        // this.anims.play("ninja-walk-right", true);
         CharMovingFunc("right",this,this.ninaSpeed,this.charname)

    } 
    else if (this.cursor.left.isDown && !this.keyZ.isDown) {
        ismoving = true;
        // this.setVelocityX(-this.ninaSpeed);
        // this.flipX = false;
        // this.anims.play("ninja-walk-right", true);
         CharMovingFunc("left",this,this.ninaSpeed,this.charname)
    } 
    else {
        this.setVelocityX(0); // Stop horizontal velocity if no X inputs are active
    }

    // 3. Vertical Movement (Up / Down)
    if (this.cursor.down.isDown) {
        ismoving = true;
        // this.setVelocityY(this.ninaSpeed);
        // this.anims.play("ninja-walk-front", true);
        CharMovingFunc("down",this,this.ninaSpeed,this.charname)
    } 
    else if (this.cursor.up.isDown) {
        ismoving = true;
        // this.setVelocityY(-this.ninaSpeed);
        // this.anims.play("ninja-walk-up", true);
         CharMovingFunc("up",this,this.ninaSpeed,this.charname)
    } 
    else {
        this.setVelocityY(0); // Stop vertical velocity if no Y inputs are active
    }

    // 4. Idle State
    if (!ismoving) {
        this.speed=200;
        this.setVelocityX(0);
        this.setVelocityY(0);
        this.anims.play(`${this.charname}-idle-front`, true);
    }
    if(ismoving &&this.speed<=600){
        this.speed=this.speed+10
    }
        
    }

    
   

 
}


  playRemoteAnim(animKey, flipX) {
        this.setFlipX(flipX);
        if (this.anims.currentAnim?.key !== animKey) {
           
            this.anims.play(animKey, true);
        }
    }

    playerAttck(aniname,name){
    
       
      
        this.setVelocity(0,0)
        this.isAttacking=true;
         
 if (aniname == "attacko1") {
        this.anims.play("ninja-spell", true);
        this.s.time.delayedCall(500, () => {
            this.isAttacking = false;
        });
        return;
    }
                this.attack=CreateNinjaAndAtaacks(this.s,this.x,this.y,name).setScale(2)


     
        

        if(aniname=="attacko4"){
            let Xnumber=Phaser.Math.Between(-100,1000)
            let Ynumber=Phaser.Math.Between(-500,1000)
            this.x=this.x+Xnumber,
            this.y=this.y+Ynumber
        }
        
         


       


        this.anims.play("ninja-spell",true)
        this.attack.anims.play(aniname,true);
          this.attack.once('animationcomplete', (animation) => {
            
            if(animation.key==aniname){
                this.isAttacking = false;
               
                this.attack.destroy();
            }
        });

            

                
         
        

    }



    rockattack(){
          if (this.isRockattack) return;
        this.isRockattack=true;
        this.attackR=CreateNinjaAndAtaacks(this.s,this.x,this.y,"rockattack").setScale(2)
         this.anims.play("ninja-spell",true)
        this.attackR.anims.play("attacko1",true);
          this.attackR.once('animationcomplete', (animation) => {
            
            if(animation.key=="attacko1"){
                this.isRockattack = false;
               
                this.attackR.destroy();
                this.attackR=null
            }
        });
       


    }

    wepoanattack(name){
       
    
         if(name=="shuriken"){
     
        
            if(this.cursor.up.isDown){
                // this.kunia= CreateNinjaAndAtaacks(this.s,this.x,this.y-100,name).setScale(2)
                //  this.kunia.setVelocityY(-500)
                this.kunai(this.s,this.x,this.y-10,name,-500,"up");
               
            }else if(this.cursor.down.isDown){
            // this.kunia= CreateNinjaAndAtaacks(this.s,this.x,this.y+100,name).setScale(2)
            //     this.kunia.setVelocityY(+500)
                 this.kunai(this.s,this.x,this.y+100,name,+500,"down");
             

            }else if(this.cursor.left.isDown){
        //    this.kunia= CreateNinjaAndAtaacks(this.s,this.x-100,this.y,name).setScale(2)
                 
        //     this.kunia.setVelocityX(-500)
             this.kunai(this.s,this.x-100,this.y,name,-500,"left");



            }
             if(this.cursor.right.isDown){
            // this.kunia= CreateNinjaAndAtaacks(this.s,this.x+100,this.y,name).setScale(2)
            //         this.kunia.setVelocityX(500)
                                 this.kunai(this.s,this.x+100,this.y,name,+500,"right");

                  


            } 
            
           
          
             this.s.time.delayedCall(200, () => { 
               
               this.isWeponAttack = false; });

            
          
                             

            
        }

          if(name=="katana"){
              
            if(this.cursor.down.isDown){
              
                  this.swordattack1(this,-2,15,"katana","katana-front","ninja-katna-front")

               

            }
            else if(this.cursor.up.isDown){
                
              this.swordattack1(this,-2,15,"katana","katana-up","ninja-katna-up")


            }
            else if(this.cursor.left.isDown){
                this.swordattack1(this,-5,0,"katana","katana-left","ninja-katna-left")
            }
            else if(this.cursor.right.isDown){
                  this.swordattack1(this,-5,0,"katana","katana-right","ninja-katna-right")

            }
        }
    }



   


     swordattack1(scene,offsetx,offsety,name,aniname,ninja_aniname){
        console.log(ninja_aniname)
         this.katna=CreateNinjaAndAtaacks(this.s,this.x+offsetx,this.y+offsetx,name).setScale(2);
            //    this.katna.setOrigin(0.5, 0.5);
               this.katna.anims.play(aniname)
                         
              
                this.isAttacking=true;

                    this.setVelocity(0,0)
              
                 this.anims.play(ninja_aniname,true)
                this.katna.anims.play(aniname,true)
               
                
                this.katna.once("animationcomplete",(animation)=>{
                    if(animation.key==aniname){
                       
                        this.isAttacking=false;
                        this.katna.destroy();
                    }

                })
    }

    kunai(s,x,y,name,velocity,dir){
          this.isWeponAttack=true
         this.kunia= CreateNinjaAndAtaacks(s,x,y,name).setScale(2).setCollideWorldBounds(false)
       
         if(dir=="up"||dir=="down"){
                 this.kunia.setVelocityY(velocity)
         }
            else if(dir=="left"||dir=="right"){
                this.kunia.setVelocityX(velocity)

            }
                  this.s.time.delayedCall(200, () => { 
               
               
               this.isWeponAttack = false; });

    }

   


}